const mongoose = require('mongoose')
require('../configs/loadModelsMongoose')
const UnitPrice = mongoose.model('UnitPrice')

createUnitPrice = async () => {
    try {
        let unitPrice = new UnitPrice()
        unitPrice.electricity = 1000
        unitPrice.water = 1000
        await unitPrice.save()
        console.log('TẠO UNIT PRICE THÀNH CÔNG')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

createUnitPrice()