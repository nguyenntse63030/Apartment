const mongoose = require('mongoose')
require('../configs/loadModelsMongoose')
const Room = mongoose.model('Room')

let apartmentId = process.argv[2]

deleteRoomByApartment = async () => {
    try {
        await Room.remove({ apartment: apartmentId })
        console.log('REMOVE SUCCESS')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

deleteRoomByApartment()