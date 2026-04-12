const router = require('express').Router()
const {Authentication} = require('../middlewares/auth')
const {createOrder, getAllOrder, getOneorder} = require('../controller/orderController')

router.post('/order', Authentication, createOrder)
router.get('/all-orders', getAllOrder)
router.get('/get-one-order/:id', Authentication, getOneorder)


module.exports = router