require('dotenv').config({ path: `${process.cwd()}/.env` })
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const helmet = require('helmet')

const checkFolder = require('./utils/checkFolder')
const catchAsync = require('./utils/catchAsync')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controller/errorController')

const authRoute = require('./route/authRoute')
const audioRoute = require('./route/audioRoute')

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:5173', // FE domain
        credentials: true
    })
)
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
checkFolder()

app.use('/api/auth', authRoute)

app.use('/api/audio', audioRoute)

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
