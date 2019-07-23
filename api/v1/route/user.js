const express = require('express')
const router = express.Router()
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const responseStatus = require('../../../configs/responseStatus')
const userController = require('../controllers/userController')
const authorize = require('../middleware/authorize')

router.get('/role/:role', authorize(), async (req, res, next) => {    //:role được nhận như một params ở trong request (Admin, Manager, Customer)
    try {
        const response = await userController.getUserByRole(req.params.role) //lấy biến role trong req.params
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.get('/apartment', authorize(), async (req, res, next) => {    
    try {
        const response = await userController.getCustomerForApartment(req.user.id) 
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.get('/:code', authorize(), async (req, res, next) => {
    try {
        const response = await userController.getUserByCode(req.params.code) //lấy biến code trong req.params
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.post('/', authorize(), async (req, res, next) => {
    try {
        const response = await userController.createUser(req.body)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.put('/changeAvatar/:userCode', authorize(), multipartMiddleware, async (req, res, next) => {
    try {
        const response = await userController.changeAvatar(req.params.userCode, req.body.photoURL)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.put('/deposit', authorize(), async (req, res, next) => {
    try {
        const response = await userController.depositAccount(req.user.id, req.body.money)
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.delete('/:code', authorize(), async (req, res, next) => {
    try {
        const response = await userController.deleteUserByCode(req.params.code) //lấy biến code trong req.params
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

router.put('/:id', authorize(), async (req, res, next) => {
    try {
        const response = await userController.updateUser(req.params.id, req.body) //lấy biến code trong req.params
        return res.send(response)
    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).send(error)
    }
})

module.exports = router
