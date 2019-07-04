const mongoose = require('mongoose')
require('../configs/loadModelsMongoose')
const common = require('../api/common')
const Apartment = mongoose.model('Apartment')
const Room = mongoose.model('Room')

updateApartmentfloor = async () => {
    try {
        let apartments = await Apartment.find()
        for (let apartment of apartments) {
            let room = await Room.findOne({ apartment: apartment._id }).sort({ roomNumber: -1 }).limit(1)
            apartment.floors = parseInt(room.roomNumber / 100)
            await apartment.save()
            console.log('UPDATE APARTMENT ' + apartment.name + ' FLOOR THÀNH CÔNG')
        }
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

updateApartmentfloor()