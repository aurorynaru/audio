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
        if (file.mimetype.startsWith('image')) {
            cb(null, 'uploads/images')
        } else if (file.mimetype.startsWith('audio')) {
            cb(null, 'uploads/audio')
        } else {
            cb(null, 'uploads/others')
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
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
    catchAsync(async (req, res) => {
        throw new AppError(`Can't find ${req.originalUrl} `, 404)
    })
)

app.use(globalErrorHandler)

const PORT = process.env.APP_PORT

app.listen(PORT, () => {
    console.log('running', PORT)
})
