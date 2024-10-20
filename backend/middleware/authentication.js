require('dotenv').config({ path: `${process.cwd()}/.env` })
const user = require('../models/user')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { tokenCache, generateToken } = require('../utils/generateToken')

const cacheFilePath = path.join(process.cwd(), 'tokenCache.json')

const authentication = catchAsync(async (req, res, next) => {
    let idToken = ''

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        idToken = req.headers.authorization.split(' ')[1]
    }

    if (!idToken) {
        return next(new AppError('Please login to gain access', 401))
    }

    const tokenDetail = jwt.verify(
        idToken,
        process.env.JWT_TOKEN,
        (err, data) => {
            if (err) {
                console.log('expired')
                return next(new AppError('access token expired', 403))
            }
            return data
        }
    )

    const loginUser = await user.findByPk(tokenDetail.id)

    if (!loginUser) {
        return next(new AppError('User no longer exists', 400))
    }
    req.user = loginUser

    return next()
})

const refreshTokenFn = catchAsync((req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return next(new AppError('invalid refresh token', 401))
    }

    const decoded = jwt.decode(refreshToken)

    let savedCache = null

    if (fs.existsSync(cacheFilePath)) {
        try {
            const fileData = fs.readFileSync(cacheFilePath, 'utf-8')
            savedCache = JSON.parse(fileData)
        } catch (err) {
            console.error('Error loading cache from file:', err)
        }
    }

    const storedToken = tokenCache.get(decoded.id) || savedCache[decoded.id]

    if (!storedToken || storedToken !== refreshToken) {
        return next(new AppError("Token doesn't exist or doesn't match", 403))
    }

    jwt.verify(refreshToken, process.env.JWT_TOKEN, (err, data) => {
        if (err) {
            return next(new AppError('invalid refresh token', 401))
        }

        const accessToken = generateToken({
            id: data.id
        })

        res.json({ accessToken })
    })
})

module.exports = { authentication, refreshTokenFn }
