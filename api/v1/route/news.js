const express = require('express')
const router = express.Router()
const newsController = require('../controllers/newsController')
const authorize = require('../middleware/authorize')

router.get('/', authorize(), async (req, res, next) => {
    try {
        let response = await newsController.getNews()
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.post('/', authorize(), async (req, res, next) => {
    try {
        const response = await newsController.createNews(req.body)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
module.exports = router
