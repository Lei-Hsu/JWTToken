const express = require('express')

// controllers
const controllers = require('../controllers/userController')
// middleware
const checkAuth = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/signin', controllers.singIn)
router.post('/finduser', controllers.findUser)
router.post('/login', controllers.logIn)
router.post('/check', checkAuth.checkAuth, controllers.check)


module.exports = router