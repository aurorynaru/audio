const express = require('express')
const {
    createAudio,
    getAllAudio,
    getAudio,
    sendComment,
    getAudioComments,
    LikeDislikeComment
} = require('../controller/audioController')
const { uploadFiles } = require('../utils/multerStorage')
const {
    authentication,
    refreshTokenFn
} = require('../middleware/authentication')
const { uploadFilesController } = require('../controller/uploadController')
const { LikeDislike } = require('../controller/playerController')
const router = express.Router()
router.post(
    '/create',
    authentication,
    (req, res, next) => {
        uploadFiles.array('files')(req, res, next, (err) => {
            if (err) {
                return fileSizeLimitErrorHandler(err, req, res, next)
            }
            next()
        })
    },
    createAudio,
    uploadFilesController
)
router.get('/all/', getAllAudio)
router.get('/get/', getAudio)
router.post('/send-message', sendComment)
router.post('/get-audio-comment', getAudioComments)
router.post('/likeDislike', authentication, LikeDislike)
router.post('/likeDislike-comment', authentication, LikeDislikeComment)

module.exports = router
