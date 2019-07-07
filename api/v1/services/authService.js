var jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
var mongoose = require('mongoose')
var User = mongoose.model('User')
var config = require('../../../config')
var responseStatus = require('../../../configs/responseStatus')
var constants = require('../../../configs/constant')
const userController = require('../controllers/userController')

async function isWebLogin(token) {
    let decode = await jwt.verify(token, config.secret)
    if (!token) {
        if (err) {
            throw responseStatus.Code400({ errorMessage: responseStatus.INVALID_REQUEST })
        }
        if (!decode || !decode.phone) {
            throw responseStatus.Code400({ errorMessage: responseStatus.INVALID_REQUEST })
        }
        const phone = decode.phone
        let user = await User.findOne({ phone: phone })
        if (!user) {
            throw responseStatus.Code400({ errorMessage: responseStatus.INVALID_REQUEST })
        }
        if (user.role !== constants.userRole.SUPERVISOR || user.role !== constants.userRole.MANAGER) {
            throw responseStatus.Code400({ errorMessage: responseStatus.INVALID_REQUEST })
        }
        return responseStatus.Code200({ user: user })
    }
}


async function checkSocialLogin(data) {
    let token = undefined
    let user = await User.findOne({ email: data.email })
    if (user) {
        token = jwt.sign({ id: user._id, phone: user.phone, name: user.name, role: user.role, loggedInTimestamp: Date.now() }, config.secret, {
            expiresIn: config.tokenExpire
        })
    }
    if (!user) {
        let newUser = {
            email: data.email,
            name: data.personFamilyName + ' ' + data.personGivenName,
            isGoogleAcc: true,
            photoURL: data.personPhoto
        }
        let dataReturn = await userController.signUpForSocial(newUser);
        user = dataReturn.user
        token = dataReturn.token
    }
    return responseStatus.Code200({
        user: user,
        token: token
    })
}
module.exports = {
    isWebLogin,
    checkSocialLogin
}
