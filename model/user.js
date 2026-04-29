const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        trim:true
        
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    profilePicture:{
        secureUrl: {
            type:String,
            trim:true
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        trim:true
        // default:()=>{
        //     return Math.round(Math.random() * 1e4)
        //     .toString()
        //     .padStart(4, "0")
        // }
    },
    otpExpires:{
        type: Date,
        default: ()=>{
            return Date.now()+ (1000 * 60 * 7)
        }
    }

})

const userModel = mongoose.model('picker', userSchema)

module.exports= userModel