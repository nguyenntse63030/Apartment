const mongoose = require('mongoose')
require('../configs/loadModelsMongoose')
const common = require('../api/common')
const User = mongoose.model('User')

updateUserCode = async () => {
    try {
        let users = await User.find()
        for (let user of users) {
            let userCode = ''
            user.name.split(' ').forEach(function (element) {
                if (element.match(/[a-z]/i)) {
                    let str = common.changeAlias(element).toUpperCase()
                    userCode += str[0]
                }
            })
            userCode += '-' + Date.now().toString().slice(9)
            user.code = userCode
            await user.save()
        }
        console.log('UPDATE USER CODE THÀNH CÔNG')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

updateUserCode()