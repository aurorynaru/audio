const express = require('express')
const {
    signUp,
    logIn,
    getUser,
    verifyToken
} = require('../controller/authController')
const { uploadAvatar } = require('../controller/uploadController')
const router = express.Router()
const fileSizeLimitErrorHandler = require('../middleware/fileSizeLimit')
const { uploadImage } = require('../utils/multerStorage')
const { refreshTokenFn } = require('../middleware/authentication')
router.post(
    '/register',
    (req, res, next) => {
        uploadImage.single('image')(req, res, next, (err) => {
            if (err) {
                return fileSizeLimitErrorHandler(err, req, res, next)
            }
            next()
        })
    },
    signUp,
    uploadAvatar
)
router.post('/login', logIn)

router.get('/get-user', getUser)

router.get('/verify-token', verifyToken)

router.post('/refresh-token', refreshTokenFn)

module.exports = router
