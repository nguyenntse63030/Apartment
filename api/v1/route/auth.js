const express = require('express')
const router = express.Router()
const passport = require('../../../configs/passport').passport
const responseStatus = require('../../../configs/responseStatus')
const constants = require('../../../configs/constant')

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

router.post('/sign_in', async function (req, res, next) {
    try {
        passport.authenticate('local', async function (err, user, info) {
            if (!user) {
                return res.status(401).send(responseStatus.Code401({ errorMessage: responseStatus.IVALID_PHONE_OR_PASSWORD }))
            }
            let objectReturnn = { token: info.token }

            objectReturnn.user = info.user
            req.session.token = info.token
            req.session.user = info.user

            req.logIn(user, async function (err) {
                if (err) { return next(err) }
            })
            objectReturnn.user.password = undefined
            return res.send(responseStatus.Code200(objectReturnn))
        })(req, res, next)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

module.exports = router
