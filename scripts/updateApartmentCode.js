const mongoose = require('mongoose')
require('../configs/loadModelsMongoose')
const common = require('../api/common')
const Apartment = mongoose.model('Apartment')

updateApartmentCode = async () => {
    try {
        let apartments = await Apartment.find()
        for (let apartment of apartments) {
            let apartmentCode = ''
            apartment.name.split(/[ -]/i).forEach(function (element) {
                if (element.match(/[a-z]/i)) {
                    let str = common.changeAlias(element).toUpperCase()
                    apartmentCode += str[0]
                }
            })
            apartmentCode += '-' + Date.now().toString().slice(9)
            apartment.code = apartmentCode
            await apartment.save()
        }
        console.log('UPDATE APARTMENT CODE THÀNH CÔNG')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

updateApartmentCode()