const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')
const constant = require('../../../configs/constant')
const common = require('../../common')
const pushNotificationsController = require('../push-notifications/pushNotificationsController')
const transactionsController = require('../controllers/transactionsController')

const User = mongoose.model('User')
const Room = mongoose.model('Room')
const Bill = mongoose.model('Bill')
const Apartment = mongoose.model('Apartment')




async function createBill(roomId, data, creator) {
    let currentDate = new Date()

    let room = await Room.findById(roomId)
    if (!room) {
        throw responseStatus.Code400({ errorMessage: responseStatus.ROOM_NOT_FOUND })
    }
    let user = await User.findById(room.user._id)
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }

    let apartment = await Apartment.findById(room.apartment)
    if (!apartment) {
        throw responseStatus.Code400({ errorMessage: responseStatus.APARTMENT_NOT_FOUND })
    }

    // Bill Code
    let date = common.formatDateCode(new Date())
    let apartmentCode = apartment.code.split('-')
    let billCode = 'B-' + apartmentCode[0] + '-' + room.roomNumber + '-' + date + '-' + currentDate.getTime().toString().slice(9)

    let bill = await Bill.findOne({ code: billCode })
    if (bill) {
        throw responseStatus.Code400({ errorMessage: responseStatus.BILL_EXISTED })
    }

    // currentDate.setDate(currentDate.getDate() + 30)
    bill = new Bill()
    bill.expiredTime = data.expiredTime || undefined
    bill.type = data.type || constant.billTypes.OTHER
    bill.description = data.description || ''
    bill.creator = creator || undefined
    bill.user = user._id || undefined
    bill.apartment = apartment._id || undefined
    bill.room = room._id || undefined
    bill.status = data.status || constant.billStatus.UNPAY
    bill.code = billCode
    bill.oldNumber = data.oldNumber || 0
    bill.newNumber = data.newNumber || 0
    bill.usedNumber = data.usedNumber || 0
    bill.unitPrice = data.unitPrice || 0
    bill.total = data.total || 0
    bill.title = common.generateBillTitle(bill.type)

    bill = await bill.save()       //Lưu user xuống database

    pushNotificationsController.sendNotification(user.androidToken, bill.title)
    return responseStatus.Code200({ message: responseStatus.CREATE_BILL_SUCCESS })
}

async function updateBill(id, data, editor) {

    let bill = await Bill.findById(id)
    if (!bill) {
        throw responseStatus.Code400({ errorMessage: responseStatus.BILL_NOT_FOUND })
    }

    bill.expiredTime = data.expiredTime || undefined
    bill.type = data.type || constant.billTypes.OTHER
    bill.description = data.description || ''
    bill.editor = editor || undefined
    bill.status = data.status || constant.billStatus.UNPAY
    bill.oldNumber = data.oldNumber || 0
    bill.newNumber = data.newNumber || 0
    bill.usedNumber = data.usedNumber || (Number(data.newNumber) - Number(data.oldNumber))
    bill.unitPrice = data.unitPrice || 0
    bill.total = data.total || 0

    bill = await bill.save()

    return responseStatus.Code200({ message: responseStatus.UPDATE_BILL_SUCCESS })
}

async function getBillByRoomId(roomId) {
    let bills = await Bill.find({ room: roomId }).sort({ createdTime: -1 }).populate('apartment').populate('creator').populate('room').populate('user')
    return responseStatus.Code200({ listBill: bills })
}

async function getUnpaidBillByUserId(userId) {
    let user = await User.findById(userId)
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }
    let statusCheck = 'UNPAY'
    let bills = await Bill.find({ user: userId }).find({ status: statusCheck }).sort({ createdTime: -1 }).populate('apartment').populate('creator').populate('room').populate('user')
    return responseStatus.Code200({ listBill: bills })
}

async function getPaidBillByUserId(userId) {
    let user = await User.findById(userId)
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }
    let statusCheck = 'PAID'
    let bills = await Bill.find({ user: userId }).find({ status: statusCheck }).sort({ createdTime: -1 }).populate('apartment').populate('creator').populate('room').populate('user')
    return responseStatus.Code200({ listBill: bills })
}

async function paymentBill(userId, billId) {
    let customer = await User.findById(userId)
    if (!customer) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }

    let bill = await Bill.findById(billId)
    if (!bill) {
        throw responseStatus.Code400({ errorMessage: responseStatus.BILL_NOT_FOUND })
    }

    if (bill.user.toString() !== customer._id.toString()) {
        throw responseStatus.Code400({ errorMessage: responseStatus.INVALID_ACCOUNT_PAYMENT })
    }

    if (bill.total > customer.account) {
        throw responseStatus.Code400({ errorMessage: responseStatus.ACCOUNT_NOT_ENOUGHT_MONEY })
    }

    let beforeTrans = customer.account
    customer.account -= bill.total
    let afterTrans = customer.account
    bill.paid = bill.total
    await bill.save()
    await customer.save()
    await changeBillStatus(bill._id, constant.billStatus.PAID)
    await transactionsController.createTransaction(bill._id, bill.total)

    return responseStatus.Code200({ message: responseStatus.PAYMENT_SUCCESS, beforeTrans: beforeTrans, afterTrans: afterTrans })
}

async function changeBillStatus(billId, status) {
    let bill = await Bill.findById(billId)
    if (!bill) {
        throw responseStatus.Code400({ errorMessage: responseStatus.BILL_NOT_FOUND })
    }

    bill.status = status
    await bill.save()
    return responseStatus.Code200({ message: responseStatus.BILL })
}

async function getAllBill() {
    let bills = await Bill.find().sort({ createdtime: -1 })
        .populate('apartment', 'name')
        .populate('room', 'roomNumber')
        .populate('user')
    return responseStatus.Code200({ bills: bills })
}

async function getBillByCode(code) {
    let bill = await Bill.findOne({ code: code })
        .populate('user', 'name')
        .populate('apartment', 'name')
        .populate('room', 'roomNumber')
        .populate('creator', 'name role')
    if (!bill) {
        throw responseStatus.Code400({ errorMessage: responseStatus.BILL_NOT_FOUND })
    }

    return responseStatus.Code200({ bill: bill })
}

async function deleteBill(id) {
    await Bill.findByIdAndRemove(id)

    return responseStatus.Code200({ message: responseStatus.DELETE_BILL_SUCCESS })
}

async function createMonthyBill() {
    let rooms = await Room.find({ user: { $exists: true } }).populate('user', '_id').populate('apartment', '_id manager')


    for (let room of rooms) {
        let bill = {}
        let currentDate = new Date()
        let expiredTime = currentDate.setDate(currentDate.getDate() + 30)
        bill.expiredTime = expiredTime || undefined
        bill.type = constant.billTypes.SERVICE
        bill.user = room.user._id
        bill.apartment = room.apartment._id
        bill.room = room._id
        bill.status = constant.billStatus.UNPAY
        bill.total = constant.SERVICE_BILL_TOTAL_PRICE

        await createBill(room._id, bill, room.apartment.manager)
    }
}

module.exports = {
    createBill,
    getBillByRoomId,
    getUnpaidBillByUserId,
    getPaidBillByUserId,
    paymentBill,
    changeBillStatus,
    getAllBill,
    getBillByCode,
    updateBill,
    deleteBill,
    createMonthyBill
}