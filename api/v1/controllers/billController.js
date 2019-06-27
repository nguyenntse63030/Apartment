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
    bill.description = data.description || ''
    bill.manager = data.manager || ''
    bill.apartment = data.apartment || ''
    bill.room = data.room || ''
    bill.status = data.status || ''
    bill.code = billCode
    bill.oldNumber = data.oldNumber || ''
    bill.newNumber = data.newNumber || ''
    let usedNumber = Number(data.newNumber) - Number(data.oldNumber)
    bill.usedNumber = usedNumber

    bil = await bill.save()       //Lưu user xuống database

    return responseStatus.Code200({ message: responseStatus.CREATE_USER_SUCCESS, user: user })
}




module.exports = {
    createBill
}