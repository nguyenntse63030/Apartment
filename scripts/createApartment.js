const mongoose = require('mongoose')
require('../configs/loadModelsMongoose')
const Apartment = mongoose.model('Apartment')

createApartment = async () => {
    try {
        let apartment = new Apartment()
        apartment.name = 'Chung cư Quốc Cường - Giai Việt'
        apartment.phone = '0906663129'
        apartment.manager = '5cf67c213c70dc0017be87d5'
        apartment.address = '854 Tạ Quang Bửu, Phường 5, Quận 8, Hồ Chí Minh'
        await apartment.save()
        console.log('TẠO APARTMENT THÀNH CÔNG')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

createApartment()