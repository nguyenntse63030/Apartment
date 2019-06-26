const express = require('express')
const router = express.Router()
const newsController = require('../controllers/newsController')

router.get('/', async (req,res, next) => {
    try {
        let response = await newsController.getNews()
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        // const token = req.session.token || req.headers['x-access-token']
        // await authService.isLogined(token)
        const response = await newsController.createNews(req.body)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})
module.exports = router
