const router = require('express').Router()

const{ createUser, updateUser}= require('../controller/userController')
const upload = require('../middlewares/multer');


router.post('/user', createUser)
router.put('/users/:id', upload.single('profilePicture'),updateUser)

module.exports = router