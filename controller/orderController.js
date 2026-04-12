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
exports.getAllOrder = async (req, res)=>{
    try {
        const allOrders = await orderModel.find()

        res.status(200).json({
            message:'Orders found',
            data:allOrders
        })
    } catch (error) {
        res.status(500).json({
            message:'Something went Wrong'
        })
    }
}
exports.getOneorder = async (req, res)=>{
    try {
        const orderId = req.params.id

    const order = await orderModel.findById(orderId)

    if(!order){
        return res.status(400).json({
            message:'Order not found'
        })
    }
    res.status(200).json({
        message:'Order retrived Successfully',
        data: order
    })
    } catch (error) {
        res.status(500).json({
            message:'Something went wrong'
        })
    }


}