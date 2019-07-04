const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')

const Apartment = mongoose.model('Apartment')
const User = mongoose.model('User')

const roomController = require('./roomController')

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

async function createApartment(data) {
    let apartment = await Apartment.findOne({ phone: data.apartment.phone })
    if (apartment) {
        throw responseStatus.Code400({ errorMessage: responseStatus.PHONE_EXISTED })
    }
    apartment = new Apartment()
    apartment.name = data.apartment.name || apartment.name
    apartment.phone = data.apartment.phone || apartment.phone
    apartment.address = data.apartment.address || apartment.address
    if (data.apartment.manager) {
        apartment.manager = data.apartment.manager
        let manager = await User.findById(data.apartment.manager)
        if (!manager) {
            throw responseStatus.Code400({ errorMessage: responseStatus.MANAGER_NOT_FOUND })
        }
        manager.apartment = apartment._id
        await manager.save()
    }

    let apartmentCode = ''
    apartment.name.split(/[ -]/i).forEach(function (element) {
        if (element.match(/[a-z]/i)) {
            let str = common.changeAlias(element).toUpperCase()
            roomCode += str[0]
        }
    })
    apartmentCode += '-' + Date.now().toString().slice(9)
    apartment.code = apartmentCode

    apartment = await apartment.save()
    await roomController.createRoomInApartment(apartment._id, data.floors)

    return responseStatus.Code200({ message: responseStatus.UPDATE_SUCCESS })
}

module.exports = {
    getApartments,
    getApartmentByCode,
    updateApartment,
    createApartment
}