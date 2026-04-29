const router = require('express').Router()

const{ createUser, updateUser, verifyuserEmail, login, forgotPassword, resetPassword, changePassword,loginWithGoogle }= require('../controller/userController')
const upload = require('../middlewares/multer');
const {Authentication} = require('../middlewares/auth')
const { profile, loginProfile } = require('../middlewares/passport');
const { signUpValidator,resetPasswordValidator,changePasswordValidator } = require('../middlewares/validators');



router.post('/user',upload.single(), signUpValidator, createUser)
router.put('/users/:id', upload.single('profilePicture'),updateUser)
router.post('/checkuser',verifyuserEmail)
router.post('/Signin', login)

router.post('/forgot-password', forgotPassword)
router.post('/reset-password',resetPasswordValidator, resetPassword)
router.post('/change-password', Authentication, changePasswordValidator, changePassword)

router.get('/auth/google', profile)
router.get('/auth/google/callback', loginProfile,loginWithGoogle)


module.exports = router