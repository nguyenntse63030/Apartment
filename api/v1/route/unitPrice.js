const express = require('express')
const router = express.Router()
const unitPriceController = require('../controllers/unitPriceController')
const authorize = require('../middleware/authorize')

router.get('/', authorize(), async (req, res, next) => {
    try {
        let response = await unitPriceController.getUnitPrice()
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.put('/', authorize(), async (req, res, next) => {
    try {
        let response = await unitPriceController.updateUnitPrice(req.body)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 5000).send(error)
    }
})
module.exports = router
