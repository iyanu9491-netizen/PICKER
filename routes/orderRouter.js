const router = require('express').Router()

const {createOrder} = require('../controller/orderController')
const {Authentication} = require('../middlewares/auth')

router.post('/order', Authentication, createOrder)


module.exports = router