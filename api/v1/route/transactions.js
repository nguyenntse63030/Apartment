const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactionsController')
const authorize = require('../middleware/authorize')

router.get('/', authorize(), async (req, res, next) => {
    try {
        let response = await transactionsController.getAllTransactions()
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

module.exports = router
