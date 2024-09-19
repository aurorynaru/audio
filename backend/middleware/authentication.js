require('dotenv').config({ path: `${process.cwd()}/.env` })
const user = require('../models/user')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

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

module.exports = authentication
