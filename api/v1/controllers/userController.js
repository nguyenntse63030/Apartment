const mongoose = require('mongoose')
const User = mongoose.model('User')
const responseStatus = require('../../../configs/responseStatus')

async function getUserByCode(code) {
    let user = await User.findOne({ code: code })   //Tìm User theo code trong database
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }

    return responseStatus.Code200({ user: user })
}

async function updateUser(id, data) {
    let user = await User.findById(id)   //Tìm hết User theo code trong database
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    } else {
        let userCheckPhone = await User.findOne({phone: data.phone, _id: {$ne: user._id}})
        if (userCheckPhone){
            throw responseStatus.Code400({errorMessage: responseStatus.PHONE_EXISTED})
        }
    }
    

    user.phone = data.phone || user.phone
    user.email = data.email || user.email
    user.dateOfBirth = data.dateOfBirth || user.dateOfBirth
    user.gender = data.gender || user.gender
    user.role = data.role || user.role
    user.name = data.name || user.name
    user.address = data.address || user.address
    user.note = data.note || user.note

    await user.save()       //Lưu user xuống database

    return responseStatus.Code200({ message: responseStatus.UPDATE_USER_SUCCESS })
}

async function deleteUserByCode(code) {
    let user = await User.findOne({ code: code })   //Tìm hết User theo code trong database
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }

    await User.remove({ code: user.code })    //Delete user theo code truyền vào
    return responseStatus.Code200({ message: responseStatus.DELETE_USER_SUCCESS })
}

async function getUserByRole(role) {
    let listUser = await User.find({ role: role }).populate('apartment')   //Tìm hết User theo role trong database
    return responseStatus.Code200({ listUser: listUser })
}

async function changeAvatar(userCode, photoURL) {
    let user = await User.findOne({ code: userCode })
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }
    user.photoURL = photoURL
    await user.save()
    return responseStatus.Code200({ message: responseStatus.CHANGE_AVATAR_SUCCESSFULLY })
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
    user.phone = data.phone || ''
    user.email = data.email || ''
    user.dateOfBirth = data.dateOfBirth || ''
    user.gender = data.gender || ''
    user.role = data.role || ''
    user.name = data.name || ''
    user.address = data.address || ''

    // User Code 
    user.name.split(' ').forEach(function (element) {
        if (element.match(/[a-z]/i)) {
            let str = common.changeAlias(element).toUpperCase()
            userCode += str[0]
        }
    })
    userCode += '-' + Date.now().toString().slice(9)
    user.code = userCode

    user = await user.save()       //Lưu user xuống database

    return responseStatus.Code200({ message: responseStatus.CREATE_USER_SUCCESS, user: user })
}

module.exports = {
    createUser,
    getUserByRole,
    deleteUserByCode,
    updateUser,
    getUserByCode,
    changeAvatar,
}