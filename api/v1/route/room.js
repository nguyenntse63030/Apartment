const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')
const authService = require('../services/authService')

router.get('/', async (req, res, next) => {
    try {
        // let token = req.session.token || req.header['mobile-access-token']
        // await authService.isWebLogin(token)
        let response = await roomController.getAllRooms()
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.get('/code/:roomCode', async (req, res, next) => {
    try {
        let response = await roomController.getRoomByCode(req.params.roomCode)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.get('/apartment/:apartmentId', async (req, res, next) => {
    try {

        // let token = req.session.token || req.header['mobile-access-token']
        // await authService.isWebLogin(token)
        let response = await roomController.getRoomForApartment(req.params.apartmentId)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.get('/user/:userCode', async (req, res, next) => {
    try {
        let response = await roomController.selectRoomsByUser(req.params.userCode)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.put('/:roomId/user/:userId', async (req, res, next) => {
    try {
        let response = await roomController.addRoomForUser(req.params.roomId, req.params.userId)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})



module.exports = router
