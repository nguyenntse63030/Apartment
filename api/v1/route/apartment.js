const express = require('express')
const router = express.Router()
const apartmentController = require('../controllers/apartmentController')

router.get('/', async (req, res, next) => {
    try {
        let response = await apartmentController.getApartments()
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.get('/:code', async (req, res, next) => {
    try {
        let response = await apartmentController.getApartmentByCode(req.params.code)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        let response = await apartmentController.updateApartment(req.params.id, req.body)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        let response = await apartmentController.createApartment(req.body)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

module.exports = router
