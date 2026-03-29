const userModel = require('../model/user')
require('dotenv').config()
const bcrypt = require('bcrypt')
const fs = require('fs')
const cloudinary = require('../middlewares/cloudinary')
const {brevo} = require('../utils/brevo')
const emailTemplate = require('../email')
const jwt = require('jsonwebtoken')

exports.createUser = async(req, res)=>{
    try {
        const {Name, Email, phoneNumber,password} = req.body
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const Newuser = new userModel({
            Name,
            Email,
            phoneNumber,
            password:hashedPassword
        })
        brevo(Newuser.Email,Newuser.Name,emailTemplate(Newuser.Name,Newuser.otp))
        await Newuser.save()
        res.status(201).json({
            message:"users Created",
            data:Newuser
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
exports.updateUser = async(req, res)=>{
    try {
        const files = req.file;
        console.log(files)
        const filePath = files['path']

        const uploadToCloudinary = await cloudinary.uploader.upload(filePath);
        const extractSecureurl = {secureUrl:uploadToCloudinary.secure_url, publicId: uploadToCloudinary.public_id}
        console.log(`hello: `, extractSecureurl)
        fs.unlinkSync(filePath)

        const {id}=req.params

        const updateUser = await userModel.findById(id, {
            profilePicture: extractSecureurl
        },
    {
        new:true
    })
    res.status(201).json({
        message:"user updated succesfully",
        data:updateUser
    })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.verifyuserEmail = async (req, res)=>{
    try {
        const {Email, otp} = req.body
        const user = await userModel.findOne({Email:Email})
        console.log(user)
    
        if(!user){
            return res.status(404).json({
                message:"User not Found"

            })
        }
       
        if(user.otp !== otp){
            return res.status(400).json({
                message:"Invalid Credentials"
            })
        }
        if(Date.now()> user.otpExpires){
            return res.status(400).json({
                message:"OTP Expired"
            })
        }
        user.isVerified = true  
        await user.save()
        res.status(200).json({
            message:"OTP sucessfully Verified"
        })
         
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message:"Something went wrong"
        }) 
        
    }
}

exports.login = async (req, res)=>{
    try {
        const { Email, password } = req.body
        const user = await userModel.findOne({ Email: Email})

        if (!user) {
            return res.status(404).json({
                message:'Invalid Credentials'
            })
        }
        
        const rightPassword = await bcrypt.compare(password, user.password)

        if(!rightPassword){
            return res.status(400).json({
                message:'Invalid Credentials'
            })
        }
        if(!user.isVerified){
            return res.status(401).json({
                message:'Verify your Email'
            })
        }
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.SECRET_KEY,
            {expiresIn:'1d'}
        );   
        res.status(200).json({
            message:'Login sucessful',
            token,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Something went Wrong'
        })
    }
}
    