const express = require('express')
const router = express.Router()
const passport = require('../../../configs/passport').passport
const responseStatus = require('../../../configs/responseStatus')
const constants = require('../../../configs/constant')
const authService = require('../services/authService')
const authorize = require('../middleware/authorize')


router.get('/sign_out', async function (req, res) {
    try {
        delete req.session.user
        delete req.session.token
        return res.send(responseStatus.Code200())
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

// router.get('/google', passport.authenticate('google', {
//     scope:
//         ['https://www.googleapis.com/auth/userinfo.email',
//             'https://www.googleapis.com/auth/userinfo.profile']
// }))
router.post('/verifyGoogle', async function (req, res, next) {
    try {
        let response = await authService.checkSocialLogin(req.body)
        res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

// router.get('/google/callback', function (req, res, next) {
//     passport.authenticate('google', function (err, user, info) {
//         if (err) {
//             return res.send({ errorMessage: err })
//         }
//         // req.session.user = info.user;
//         // req.session.token = info.token;
//         return res.send(responseStatus.Code200({
//             user: info.user,
//             token: info.token
//         }))
//     })(req, res, next)
// })

router.post('/sign_in', async function (req, res, next) {
    try {
        passport.authenticate('local', function (err, user, info) {
            if (err) return res.status(err.status || 500).send(err)
            if (!user) {
                return res.status(401).send(responseStatus.Code401({ errorMessage: responseStatus.IVALID_PHONE_OR_PASSWORD }))
            }
            let objectReturnn = { token: info.token }

            if (info.user.role === constants.userRole.SUPERVISOR || info.user.role === constants.userRole.MANAGER) {

                objectReturnn.user = info.user
                req.session.token = info.token
                req.session.user = info.user

                req.logIn(user, function (err) {
                    if (err) { return next(err) }
                })
                objectReturnn.user.password = undefined
                return res.send(responseStatus.Code200(objectReturnn))
            } else {
                return res.status(401).send(responseStatus.Code401({ errorMessage: responseStatus.IVALID_PHONE_OR_PASSWORD }))
            }
        })(req, res, next)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send(error)
    }
})

router.post('/sign_in_mobile', async function (req, res, next) {
    try {
        passport.authenticate('local', function (err, user, info) {
            if (err) return res.status(err.status || 500).send(err)
            if (!user) {
                return res.status(401).send(responseStatus.Code401({ errorMessage: responseStatus.IVALID_PHONE_OR_PASSWORD }))
            }
            let objectReturnn = { token: info.token }

            if (info.user.role === constants.userRole.CUSTOMER) {
                objectReturnn.user = info.user
                req.session.token = info.token
                req.session.user = info.user
                req.logIn(user, function (err) {
                    if (err) { return next(err) }
                })
                objectReturnn.user.password = undefined
                return res.send(responseStatus.Code200(objectReturnn))
            } else {
                return res.status(401).send(responseStatus.Code401({ errorMessage: responseStatus.IVALID_PHONE_OR_PASSWORD }))
            }


        })(req, res, next)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).send(error)
    }
})

module.exports = router
