const mongoose = require('mongoose')
const User = mongoose.model('User')
const responseStatus = require('../../configs/responseStatus')

async function getUserByCode(code) {
    let user = await User.findOne({code: code})   //Tìm User theo code trong database
    if (!user){
        throw responseStatus.Code400({errorMessage: responseStatus.USER_NOT_FOUND})
    }     

    return responseStatus.Code200({ user: user })
}

async function updateUserByCode(data, code) {
    let user = await User.findOne({code: code})   //Tìm hết User theo code trong database
    if (!user){
        throw responseStatus.Code400({errorMessage: responseStatus.USER_NOT_FOUND})
    }
    
    user.phone = data.phone || user.phone
    user.email = data.email || user.email
    user.dateOfBirth = data.dateOfBirth || user.dateOfBirth
    user.gender = data.gender || user.gender
    user.role = data.role || user.role
    user.name = data.name || user.name
    user.address = data.address || user.address

    await user.save()       //Lưu user xuống database

    return responseStatus.Code200({ message: responseStatus.UPDATE_USER_SUCCESS })
}

async function deleteUserByCode(code) {
    let user = await User.findOne({code: code})   //Tìm hết User theo code trong database
    if (!user){
        throw responseStatus.Code400({errorMessage: responseStatus.USER_NOT_FOUND})
    }

    await User.remove({code: user.code})    //Delete user theo code truyền vào
    return responseStatus.Code200({ message: responseStatus.DELETE_USER_SUCCESS })
}

async function getUserByRole(role) {
    let listManager = await User.find({role: role})   //Tìm hết User theo role trong database
    return responseStatus.Code200({ listManager: listManager })
}

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
    getUserByRole,
    deleteUserByCode,
    updateUserByCode,
    getUserByCode,
}