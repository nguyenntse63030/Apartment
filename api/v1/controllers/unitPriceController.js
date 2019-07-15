const mongoose = require('mongoose')
const responseStatus = require('../../../configs/responseStatus')

const UnitPrice = mongoose.model('UnitPrice')

async function getUnitPrice() {
    let unitPrice = await UnitPrice.findOne()
    return responseStatus.Code200({ unitPrice: unitPrice })
}

async function updateUnitPrice(data) {
    let unitPrice = await UnitPrice.findOne()
    unitPrice.electricity = Number(data.electricity)
    unitPrice.water = Number(data.water)
    await unitPrice.save()
    return responseStatus.Code200({ message: responseStatus.UPDATE_SUCCESS })
}


module.exports = {
    getUnitPrice,
    updateUnitPrice,
}