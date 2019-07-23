const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')
const authorize = require('../middleware/authorize')

router.get('/', authorize(), async (req, res, next) => {
    try {
        let response = await roomController.getAllRooms()
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.get('/code/:roomCode', authorize(), async (req, res, next) => {
    try {
        let response = await roomController.getRoomByCode(req.params.roomCode)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.get('/apartment/:apartmentId', authorize(), async (req, res, next) => {
    try {
        let response = await roomController.getRoomForApartment(req.params.apartmentId)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.get('/userId/:userId', authorize(), async (req, res, next) => {
    try {
        let response = await roomController.getRoomsByUserId(req.params.userId)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.get('/apartment/user/:userId', authorize(), async (req, res, next) => {
    try {
        let response = await roomController.getRoomForUserInApartment(req.params.userId, req.user.id)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.get('/apartment/:id/floor/:floor', authorize(), async (req, res, next) => {
    try {
        let response = await roomController.getMaxRoomInFloor(req.params.id, req.params.floor)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.put('/:roomId/user/:userId', authorize(), async (req, res, next) => {
    try {
        let response = await roomController.addRoomForUser(req.params.roomId, req.params.userId)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.post('/apartment/:id', authorize(), async (req, res, next) => {
    try {
        let response = await roomController.addRoomForApartment(req.params.id, Number(req.body.roomNumber))
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

module.exports = router
