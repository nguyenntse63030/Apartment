const mongoose = require('mongoose')
require('../configs/loadModelsMongoose')
const Apartment = mongoose.model('Apartment')

createApartment = async () => {
    try {
        let apartment = new Apartment()
        apartment.name = 'Chung cư I-Home'
        apartment.phone = '01867258489'
        apartment.manager = '5cf67c3b3c70dc0017be87d6'
        apartment.address = 'Đường Phạm Văn Chiêu, Phường 9, Gò Vấp, Hồ Chí Minh'
        await apartment.save()
        console.log('TẠO APARTMENT THÀNH CÔNG')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

createApartment()