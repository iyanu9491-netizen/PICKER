const paymentModel = require ('../model/payment')
const userModel = require ('../model/user')
const orderModel = require('../model/orderModel')
const otpGenerator = require('otp-generator')
const axios = require ('axios')

exports.initializePayment = async (req, res)=>{
    try {
        const userId = req.user.id
        const {orderId} = req.params

        const user = await userModel.findById(userId)
        if(!user){
            return res.status(404).json({
                message:'User not Found'
            })
             
        }
        const order = await orderModel.findById(orderId)
        if(!order){
            return res.status(404).json({
                message:'Order not Found'
            })

        }
        const ref = otpGenerator.generate(12,{upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})
        const reference = `TCA-Picker-${ref}`

        const paymentData ={
            amount: parseInt(order.deliveryFee) * 100,
            currency:'NGN',
            reference,
            customer:{
                email:user.Email,
                name:user.Name
            },
            redirect_url: `http://localhost:1144/verify-payment?reference=${reference}`
        }
        // console.log(order.deliveryFee)
        const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/initialize', 
            paymentData, {
                    headers: {
                        Authorization:`Bearer ${process.env.KORA_API_KEY}`
                    }
        });

        console.log('kora: ', response)
        const payment = new paymentModel({
            amount: paymentData.amount,
            reference,
            userId,
            orderId
        })
        await payment.save()

        res.status(200).json({
            message:'Payment Initiated Succesfully',
            data:response.data?.data,
            payment
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Error initializing payment'
        })
    }
}
exports.verifyPayment = async (req, res)=> {
    try {
        const {reference} = req.query
        const payment = await paymentModel.findOne({reference})
        if(!payment){
            return res.status(404).json({
                message:'Payment not Found',
                data:payment
            })
        }

        const{data} = await axios.get(`https://api.korapay.com/merchant/api/v1/charges/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.KORA_API_KEY}`
            }
        })

        if(data.status === 'success'){
            payment.status = 'successful'
            await payment.save()
        }
        
        res.status(200).json({
            message:'Payment Verified Succesfully',
            data:payment
        });
    } catch (error) {
        res.status(500).json({
            message:'Error fetching Payment'
        })
    }
}