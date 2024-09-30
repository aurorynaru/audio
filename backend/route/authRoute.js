const express = require('express')
const { signUp, logIn, refreshToken } = require('../controller/authController')
const { uploadAvatar } = require('../controller/uploadController')
const router = express.Router()
const fileSizeLimitErrorHandler = require('../middleware/fileSizeLimit')
const { uploadImage } = require('../utils/multerStorage')
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

router.post('refresh', refreshToken)

module.exports = router
