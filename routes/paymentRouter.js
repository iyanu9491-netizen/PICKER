const {initializePayment, verifyPayment} = require('../controller/paymentController')
const router = require ('express').Router()
const {Authentication} = require('../middlewares/auth')

router.post('/intialize-payment/:orderId', Authentication, initializePayment);

router.get('/verify-payment', verifyPayment)

module.exports = router