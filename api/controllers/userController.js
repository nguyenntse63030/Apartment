const mongoose = require('mongoose')
const User = mongoose.model('User')
const responseStatus = require('../../configs/responseStatus')

async function createUser(data) {
    let user = await User.findOne({ phone: data.phone })   //Tìm trong database theo sdt

    if (user) {
        //Nếu người dùng đã tồn tại
        //Thống báo về phía client một message
        throw responseStatus.Code400({ errorMessage: responseStatus.PHONE_EXISTED })
    }

    //Đổ data vào User
    user = new User()
    user.code = Date.now()
    user.phone = data.phone || ''
    user.email = data.email || ''
    user.dateOfBirth = data.dateOfBirth || ''
    user.gender = data.gender || ''
    user.role = data.role || ''
    user.name = data.name || ''
    user.address = data.address || ''

    await user.save()       //Lưu user xuống database

    return responseStatus.Code200({ message: responseStatus.CREATE_USER_SUCCESS })
}

module.exports = {
    createUser,
}