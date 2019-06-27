const mongoose = require('mongoose')
require('../configs/loadModelsMongoose')
const Bill = mongoose.model('Bill')

createBill = async () => {
    try {
        let billCode = 101
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
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

createBill()