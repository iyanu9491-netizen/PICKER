const orderModel = require ('../model/orderModel')

exports.createOrder = async (req, res) => {
    try {
        const {totalAmount, deliveryFee, taxAmount, discount} = req.body

        const order = new orderModel({
            totalAmount,
            deliveryFee,
            taxAmount,
            discount
        })
        await order.save()
        res.status(201).json({
            message:'Orders Created',
            data: order
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message:'Something went Wrong'
        })
    }
}