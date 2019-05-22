const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/role/:role', async (req, res, next) => {    //:role được nhận như một params ở trong request (Admin, Manager, Customer)
    try {

        // const token = req.session.token || req.headers['x-access-token']
        // await authService.isLogined(token)
        const response = await userController.getUserByRole(req.params.role) //lấy biến role trong req.params
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.get('/:code', async (req, res, next) => {   
    try {

        // const token = req.session.token || req.headers['x-access-token']
        // await authService.isLogined(token)
        const response = await userController.getUserByCode(req.params.code) //lấy biến code trong req.params
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
        const response = await userController.createUser(req.body)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.delete('/:code', async (req, res, next) => {    
    try {

        // const token = req.session.token || req.headers['x-access-token']
        // await authService.isLogined(token)
        const response = await userController.deleteUserByCode(req.params.code) //lấy biến code trong req.params
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.put('/:code', async (req, res, next) => {    
    try {

        // const token = req.session.token || req.headers['x-access-token']
        // await authService.isLogined(token)
        const response = await userController.updateUserByCode(req.body, req.params.code) //lấy biến code trong req.params
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

module.exports = router
