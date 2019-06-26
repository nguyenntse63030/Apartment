const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')

const Apartment = mongoose.model('Apartment')

async function getApartments() {
    let apartments = await Apartment.find()
    return responseStatus.Code200({ apartments: apartments })
}


module.exports = {
    getApartments,
}