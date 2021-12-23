const express = require('express')

// controllers
const controllers = require('../controllers/productController')

const router = express.Router()

router.get('/find', controllers.findProduct)
router.get('/add', controllers.addProduct)


module.exports = router