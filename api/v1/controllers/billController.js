const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')

const User = mongoose.model('User')
const Room = mongoose.model('Room')
const Bill = mongoose.model('Bill')
const Apartment = mongoose.model('Apartment')

async function createBill(data) {
    let room =  await Room.findById(data.room.id)
    if(!room){
        throw responseStatus.Code400({ errorMessage: responseStatus.ROOM_NOT_FOUND })
    }
    
    let user = await User.findById(room.user.id)
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }
    // Bill Code 
    let billCode ='B-'+ data.apartment.code +'-'+ data.room.number + '-' + Date.now().toString()

    let bill = await Bill.findOne({ code: billCode })   //Tìm trong database theo code

    if (bill) {
        //Nếu bill đã tồn tại
        //Thống báo về phía client một message
        throw responseStatus.Code400({ errorMessage: responseStatus.BILL_EXISTED })
    }

    var expiredDate = new Date(); // Now
    expiredDate.setDate(date.getDate() + 30); // Set now + 30 days as the new date
    

    //Đổ data vào bill

    bill = new Bill()
    bill.expiredTime = expiredDate.getTime()
    bill.type = data.type || ''
    bill.manager = data.manager || ''
    bill.apartment = data.apartment || ''
    bill.room = data.room || ''
    bill.status = data.status || ''
    bill.code = billCode

    bil = await bill.save()       //Lưu user xuống database

    return responseStatus.Code200({ message: responseStatus.CREATE_USER_SUCCESS, user: user })
}

async function insertBillForRoom(billCode, roomCode) {
    let room = await Room.find({ code: roomCode })
    if (!room) {
        throw responseStatus.Code400({ errorMessage: responseStatus.ROOM_NOT_FOUND })
    }

    let user = await User.find({ code: userCode })
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }

    if (!room.user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.ROOM_HAD_EXISTED_USER })
    }

    room.user = user._id

    await room.save()
    return responseStatus.Code200({ message: responseStatus.INSERT_ROOM_FOR_USER_SUCCESS })
}
async function selectBillByRoom(roomCode) {
    let user = await User.findById(userCode)

    if(!user){
        return responseStatus.Code400({ errorMessage:responseStatus.USER_NOT_FOUND })
    }
    let listRoom = await Room.find({ user: userCode}).populate('user').populate('apartment')
    return responseStatus.Code200({ listRoom: listRoom })
}


module.exports = {
    createBill
}