const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')

const Apartment = mongoose.model('Apartment')
const User = mongoose.model('User')

async function getApartments() {
    let apartments = await Apartment.find().populate('manager', 'name')
    return responseStatus.Code200({ apartments: apartments })
}

async function getApartmentByCode(code) {
    let apartment = await Apartment.findOne({ code: code }).populate('manager')
    return responseStatus.Code200({ apartment: apartment })
}

async function updateApartment(id, data) {
    let apartment = await Apartment.findById(id)
    if (!apartment) {
        throw responseStatus.Code400({ errorMessage: responseStatus.APARTMENT_NOT_FOUND })
    }

    apartment.name = data.name || apartment.name
    apartment.phone = data.phone || apartment.phone
    apartment.address = data.address || apartment.address
    if (data.manager) {
        apartment.manager = data.manager
        let manager = await User.findById(data.manager)
        manager.apartment = apartment._id
        await manager.save()
    }

    await apartment.save()
    return responseStatus.Code200({ message: responseStatus.UPDATE_SUCCESS })
}

module.exports = {
    getApartments,
    getApartmentByCode,
    updateApartment
}