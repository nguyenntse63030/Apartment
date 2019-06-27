const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomController')

router.put('/:roomCode/user/:userCode', async (req, res, next) => {    
    try {
        let response = await roomController.insertRoomForUser(req.params.roomCode, req.params.userCode)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.get('/:userCode', async (req,res, next) => {
    try {
        let response = await roomController.selectRoomsByUser(req.params.userCode)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
router.get('/code/:roomCode', async (req,res, next) => {
    try {
        let response = await roomController.selectRoomByCode(req.params.roomCode)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

module.exports = router
