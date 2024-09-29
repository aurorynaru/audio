require('dotenv').config({ path: `${process.cwd()}/.env` })
const user = require('../models/user')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const { tokenCache } = require('../utils/generateToken')

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

    const tokenDetail = jwt.verify(idToken, process.env.JWT_TOKEN)

    const loginUser = await user.findByPk(tokenDetail.id)

    if (!loginUser) {
        return next(new AppError('User no longer exists', 400))
    }
    req.user = loginUser

    return next()
})

const refreshTokenFn = catchAsync((req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return next(new AppError('invalid refresh token', 401))
    }

    const decoded = jwt.decode(refreshToken)
    const storedToken = tokenCache.get(decoded.id)

    if (!storedToken || storedToken !== refreshToken) {
        return next(new AppError("Token doesn't exist or doesn't match", 403))
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_TOKEN, (err, id) => {
        if (err) {
            return next(new AppError('invalid refresh token', 401))
        }

        const accessToken = generateAccessToken({
            id
        })

        res.json({ accessToken })
    })
})

module.exports = { authentication, refreshTokenFn }
