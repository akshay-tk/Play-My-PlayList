const router = require('express').Router()
const roomController=require('../controllers/roomController')
const userController=require('../controllers/userController')
const otpController=require('../controllers/otpController')
const songController=require('../controllers/songController')

router.get('/createroom/generateId',roomController.generateRoomId)
router.post('/createroom',roomController.createRoom)
router.post('/login-room',roomController.loginRoom)
router.post('/joinroom/fetch-user',roomController.fetchUser)

router.post('/signup',userController.signup)
router.post('/signin',userController.signin)
router.post('/forgot-password/update-password',userController.updateUserPassword)



router.post('/forgot-password/create-otp',otpController.createOtp)
router.post('/forgot-password/verify-otp',otpController.verifyOtp)

router.post('/joinroom/add-song',songController.addSong)
router.post('/joinroom/fetch-my-song',songController.fetchSong)


module.exports = router