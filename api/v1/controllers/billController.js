const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')

const User = mongoose.model('User')
const Room = mongoose.model('Room')
const Bill = mongoose.model('Bill')
const Apartment = mongoose.model('Apartment')

async function createBill(data) {
    let room =  await Room.findById(data.room.id).populate('apartment')
    if(!room){
        throw responseStatus.Code400({ errorMessage: responseStatus.ROOM_NOT_FOUND })
    }
    let apartment = room.apartment
    let user = await User.findById(room.user._id)
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }
    // Bill Code 
    let billCode ='B-'+ apartment.code +'-'+ room.roomNumber + '-' + Date.now().toString()

    let bill = await Bill.findOne({ code: billCode })   //Tìm trong database theo code

    if (bill) {
        //Nếu bill đã tồn tại
        //Thống báo về phía client một message
        throw responseStatus.Code400({ errorMessage: responseStatus.BILL_EXISTED })
    }

    var expiredDate = new Date(); // Now
    expiredDate.setDate(expiredDate.getDate() + 30); // Set now + 30 days as the new date
    let manager = await User.findById(data.manager.id)
    if (!manager) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }
    

    //Đổ data vào bill

    bill = new Bill()
    bill.expiredTime = expiredDate.getTime()
    bill.type = data.type || ''
    bill.description = data.description || ''
    bill.manager = manager || ''
    bill.user = user || ''
    bill.apartment = apartment || ''
    bill.room = room || ''
    bill.status = data.status || 'UNPAID'
    bill.code = billCode
    bill.oldNumber = data.oldNumber || ''
    bill.newNumber = data.newNumber || ''
    let usedNumber = Number(data.newNumber) - Number(data.oldNumber)
    bill.usedNumber = usedNumber

    bil = await bill.save()       //Lưu user xuống database

    return responseStatus.Code200({ message: responseStatus.CREATE_USER_SUCCESS, bill: bill })
}

async function getBillByRoomId(roomId){
    let bills = await Bill.find({ room : roomId}).sort({createdTime: -1})
    return responseStatus.Code200({ listBill: bills })
}

async function getUnpaidBillByUserId(userId){
    let user = await User.findById( userId)
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }
    let statusCheck = 'UNPAID'
    let bills = await Bill.find({ user : userId}).find({status:statusCheck}).sort({createdTime: -1})
    return responseStatus.Code200({ listBill: bills })
}
async function getPaidBillByUserId(userId){
    let user = await User.findById( userId)
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }
    let statusCheck = 'PAID'
    let bills = await Bill.find({ user : userId}).find({status:statusCheck}).sort({createdTime: -1})
    return responseStatus.Code200({ listBill: bills })
}


module.exports = {
    createBill,
    getBillByRoomId,
    getUnpaidBillByUserId,
    getPaidBillByUserId
}