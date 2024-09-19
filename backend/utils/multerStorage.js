const multer = require('multer')
const randText = require('./randText')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, 'uploads/images')
        } else if (file.mimetype.startsWith('audio')) {
            cb(null, 'uploads/audio')
        } else {
            cb(null, 'uploads/others')
        }
    },

    filename: function (req, file, cb) {
        cb(null, `${randText()}-${file.originalname}`)
    }
})

// const uploadImage = multer({ storage: storage, limits: { fileSize: 1000000 } })
const uploadImage = multer({
    storage: storage,
    limits: { fileSize: 3250000 }
})
const uploadFiles = multer({
    storage: storage,
    limits: { fileSize: 21500000 }
})

module.exports = { uploadImage, uploadFiles }
