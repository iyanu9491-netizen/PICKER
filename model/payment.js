const mongoose = require ('mongoose')

const paymentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'picker',
        required:true
    },
    orderId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'orderDetails',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    reference:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','successful','Failed'],
        default:'pending'
    }
}, {timestamps:true})

const paymentModel = mongoose.model('payments', paymentSchema)

module.exports = paymentModel