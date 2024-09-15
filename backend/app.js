require('dotenv').config({ path: `${process.cwd()}/.env` })
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const helmet = require('helmet')

const checkFolder = require('./utils/checkFolder')
const catchAsync = require('./utils/catchAsync')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controller/errorController')

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

checkFolder()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Check the file type and set destination accordingly
        if (file.mimetype.startsWith('image')) {
            cb(null, 'uploads/images') // Save images in /uploads/images
        } else if (file.mimetype.startsWith('audio')) {
            cb(null, 'uploads/audio') // Save audio files in /uploads/audio
        } else {
            cb(null, 'uploads/others') // Save other files in /uploads/others
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`) // Save the file with a timestamp and original name
    }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.array('files'), (req, res) => {
    console.log(req.files)
    res.send('File uploaded successfully!')
})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'yo' })
})

app.use(
    '*',
    catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl}`, 404)
    })
)

app.use(globalErrorHandler)

const PORT = process.env.NODE_PORT

app.listen(PORT, () => {
    console.log(`listen ${PORT}`)
})
