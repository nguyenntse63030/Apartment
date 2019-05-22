const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

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



module.exports = router
