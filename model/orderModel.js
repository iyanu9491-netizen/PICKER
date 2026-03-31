const mongoose = require ('mongoose')

const orderSchema = new mongoose.Schema(
    {
        totalAmount:{
            type:String,
            required:true,
            trim:true
        },
        deliveryFee:{
            type:String,
            required:true,
            trim:true
        },
        taxAmount:{
            type:String,
            required:true,
            trim:true
        },
        discount:{
            type:String,
            required:true,
            trim:true
        }
    }
)

const orderModel = mongoose.model('orderDetails', orderSchema)

module.exports = orderModel