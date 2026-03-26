const userModel = require('../model/user')
require('dotenv').config()
const bycrypt = require('bcrypt')
const fs = require('fs')
const cloudinary = require('../middlewares/cloudinary')

exports.createUser = async(req, res)=>{
    try {
        const {Name, Email, phoneNumber,password} = req.body
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password,salt)

        const Newuser = await userModel.create({
            Name,
            Email,
            phoneNumber,
            password:hashedPassword
        })
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