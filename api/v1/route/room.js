const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')


router.get('/roomCount/:apartmentId', async (req, res, next) => {
    try {
        let response = await roomController.getRoomForApartment(req.params.apartmentId)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.get('/:userCode', async (req, res, next) => {
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
