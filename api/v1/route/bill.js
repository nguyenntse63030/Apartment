const express = require('express')
const router = express.Router()
const billController = require('../controllers/billController')



router.post('/', async (req, res, next) => {
    try {
        // const token = req.session.token || req.headers['x-access-token']
        // await authService.isLogined(token)
        const response = await billController.createBill(req.body)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.get('/room/:roomId', async (req,res, next) => {
    try {
        let response = await billController.getBillByRoomId(req.params.roomId)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.get('/user/:userId', async (req,res, next) => {
    try {
        let response = await billController.getBillByUserId(req.params.userId)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

module.exports = router
