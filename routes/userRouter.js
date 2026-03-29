const router = require('express').Router()

const{ createUser, updateUser, verifyuserEmail, login, }= require('../controller/userController')
const upload = require('../middlewares/multer');


router.post('/user',upload.single(), createUser)
router.put('/users/:id', upload.single('profilePicture'),updateUser)
router.post('/checkuser',verifyuserEmail)
router.post('/Signin', login)

module.exports = router