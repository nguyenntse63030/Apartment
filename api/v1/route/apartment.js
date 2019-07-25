const express = require('express')
const router = express.Router()
const apartmentController = require('../controllers/apartmentController')
const authorize = require('../middleware/authorize')

router.get('/', authorize(), async (req, res, next) => {
    try {
        let response = await apartmentController.getApartments()
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.get('/customer', authorize(), async (req, res, next) => {
    try {
        let response = await apartmentController.getApartmentForCustomer(req.user.id)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.get('/:code', authorize(), async (req, res, next) => {
    try {
        let response = await apartmentController.getApartmentByCode(req.params.code)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.put('/:id', authorize(), async (req, res, next) => {
    try {
        let response = await apartmentController.updateApartment(req.params.id, req.body)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.post('/', authorize(), async (req, res, next) => {
    try {
        let response = await apartmentController.createApartment(req.body)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

module.exports = router
