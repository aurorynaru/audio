const express = require('express')
const createAudio = require('../controller/audioController')
const { uploadFiles } = require('../utils/multerStorage')
const authentication = require('../middleware/authentication')
const { uploadFilesController } = require('../controller/uploadController')
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

module.exports = router
