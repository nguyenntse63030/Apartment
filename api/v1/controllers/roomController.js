const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')

const User = mongoose.model('User')
const Room = mongoose.model('Room')

async function insertRoomForUser(roomCode, userCode) {
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

async function selectRoomsByUser(userCode) {
    let user = await User.findById(userCode)
    if(!user){
        return responseStatus.Code400({ errorMessage:responseStatus.USER_NOT_FOUND })
    }
    let listRoom = await Room.find({ user: userCode}).populate('user').populate('apartment')
    return responseStatus.Code200({ listRoom: listRoom })
}


module.exports = {
    insertRoomForUser,
    selectRoomsByUser
}