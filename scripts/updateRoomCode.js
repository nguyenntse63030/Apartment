const mongoose = require('mongoose')
require('../configs/loadModelsMongoose')
const common = require('../api/common')
const Room = mongoose.model('Room')

updateRoomCode = async () => {
    try {
        let rooms = await Room.find().populate('apartment', 'name')
        for (let room of rooms) {
            let roomCode = ''
            room.apartment.name.split(/[ -]/i).forEach(function (element) {
                if (element.match(/[a-z]/i)) {
                    let str = common.changeAlias(element).toUpperCase()
                    roomCode += str[0]
                }
            })
            roomCode += '-' + room.roomNumber
            room.code = roomCode
            await room.save()
        }
        console.log('UPDATE ROOM CODE THÀNH CÔNG')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

updateRoomCode()