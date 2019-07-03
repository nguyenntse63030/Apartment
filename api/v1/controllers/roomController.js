const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')
const constant = require('../../../configs/constant')
const User = mongoose.model('User')
const Room = mongoose.model('Room')
const Apartment = mongoose.model('Apartment')
const common = require('../../common')

async function getAllRooms() {
    let rooms = await Room.find({}).populate('user', 'name').populate('apartment', 'name').sort({ roomNumber: 1 })
    return responseStatus.Code200({ rooms: rooms })
}

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
    room.signDate = Date.now()
    room.expiredDate = new Date().setFullYear(new Date().getFullYear() + 1)

    await room.save()
    return responseStatus.Code200({ message: responseStatus.INSERT_ROOM_FOR_USER_SUCCESS })
}

async function getRoomsByUserId(userId) {
    let user = await User.findById(userId)
    if (!user) {
        return responseStatus.Code400({ errorMessage: responseStatus.USER_NOT_FOUND })
    }
    let listRoom = await Room.find({ user: userCode }).populate('user').populate('apartment')
    return responseStatus.Code200({ listRoom: listRoom })
}
async function getRoomByCode(roomCode) {
    let room = await Room.findOne({ code: roomCode }).populate('user').populate('apartment')
    return responseStatus.Code200({ room: room })
}

async function getRoomForApartment(apartmentId) {
    let rooms = await Room.find({ apartment: apartmentId }).populate('user', 'name').sort({ roomNumber: 1 })
    return responseStatus.Code200({ rooms: rooms })
}

async function createRoomInFloor(apartmentId, floors) {
    let apartment = await Apartment.findById(apartmentId)
    if (!apartment) {
        throw responseStatus.Code400({ errorMessage: responseStatus.APARTMENT_NOT_FOUND })
    }
    let floorNumber = 1
    for (let floor of floors) {
        let baseRoomNumber = 100 * floorNumber
        for (let number = 1; number <= floor; number++) {
            let room = new Room()

            room.roomNumber = baseRoomNumber + number

            let roomCode = ''
            apartment.name.split(/[ -]/i).forEach(function (element) {
                if (element.match(/[a-z]/i)) {
                    let str = common.changeAlias(element).toUpperCase()
                    roomCode += str[0]
                }
            })
            roomCode += '-' + room.roomNumber
            room.code = roomCode
            room.apartment = apartment._id

            await room.save()
        }
        floorNumber++
    }


    return responseStatus.Code200({ message: responseStatus.CREATE_ROOM_SUCCESS })
}

module.exports = {
    addRoomForUser,
    getRoomsByUserId,
    getRoomForApartment,
    getRoomByCode,
    getAllRooms,
    createRoomInFloor
}