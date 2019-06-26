const mongoose = require('mongoose')
require('../configs/loadModelsMongoose')
const Apartment = mongoose.model('Apartment')
const Room = mongoose.model('Room')

let apartmentId = process.argv[2]
let numberOfFloor = process.argv[3]

createRoomForApartment = async () => {
    try {
        let minNumber = 101
        for (let i = 0; i < numberOfFloor; i++) {
            for (let j = 0; j < 5; j++) {
                let room = new Room()
                room.roomNumber = minNumber + j
                room.apartment = apartmentId
                await room.save()
                console.log('TẠO ROOM ' + room.roomNumber + ' THÀNH CÔNG')
            }
            minNumber += 100
        }
        console.log('SUCCESS')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

createRoomForApartment()