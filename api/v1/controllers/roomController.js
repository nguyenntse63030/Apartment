const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')
const constant = require('../../../configs/constant')
const User = mongoose.model('User')
const Room = mongoose.model('Room')

async function addRoomForUser(roomId, userId) {
    let room = await Room.findById(roomId)
    if (!room) {
        throw responseStatus.Code400({ errorMessage: responseStatus.ROOM_NOT_FOUND })
    }

    let user = await User.findOne({ _id: userId, role: constant.userRole.CUSTOMER })
    if (!user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }

    if (room.user) {
        throw responseStatus.Code400({ errorMessage: responseStatus.ROOM_HAD_EXISTED_USER })
    }

    room.user = user._id

    await room.save()
    return responseStatus.Code200({ message: responseStatus.INSERT_ROOM_FOR_USER_SUCCESS })
}

async function selectRoomsByUser(userCode) {
    let user = await User.findById(userCode)
    if (!user) {
        return responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }
    let listRoom = await Room.find({ user: userCode }).populate('user').populate('apartment')
    return responseStatus.Code200({ listRoom: listRoom })
}

async function getRoomForApartment(apartmentId) {
    let rooms = await Room.find({ apartment: apartmentId }).sort({ roomNumber: 1 })
    return responseStatus.Code200({ rooms: rooms })
}

module.exports = {
    addRoomForUser,
    selectRoomsByUser,
    getRoomForApartment
}