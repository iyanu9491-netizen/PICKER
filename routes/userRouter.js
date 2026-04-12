const router = require('express').Router()

const{ createUser, updateUser, verifyuserEmail, login, forgotPassword, resetPassword, changePassword, }= require('../controller/userController')
const upload = require('../middlewares/multer');
const {Authentication} = require('../middlewares/auth')
const { signUpValidator,resetPasswordValidator,changePasswordValidator } = require('../middlewares/validators');



router.post('/user',upload.single(), signUpValidator, createUser)
router.put('/users/:id', upload.single('profilePicture'),updateUser)
router.post('/checkuser',verifyuserEmail)
router.post('/Signin', login)

router.post('/forgot-password', forgotPassword)
router.post('/reset-password',resetPasswordValidator, resetPassword)
router.post('/change-password', Authentication, changePasswordValidator, changePassword)

module.exports = router