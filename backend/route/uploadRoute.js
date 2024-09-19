const express = require('express')
const { uploadFiles } = require('../controller/uploadController')

const router = express.Router()

router.post('/f', uploadFiles)

module.exports = router
