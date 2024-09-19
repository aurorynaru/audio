const AppError = require('../utils/appError')

require('dotenv').config({ path: `${process.cwd()}/.env` })

const sendErrorDev = (err, res) => {
    const statusCode = err.statusCode || 500
    const status = err.status || 'error'
    const message = err.message
    const stack = err.stack

    res.status(statusCode).json({
        status,
        message,
        stack
    })
}
const sendErrorProd = (err, res) => {
    const statusCode = err.statusCode || 500
    const status = err.status || 'error'
    const message = err.message
    const stack = err.stack

    if (err.isOperational) {
        res.status(statusCode).json({
            status,
            message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'something went wrong'
    })
}

const globalErrorHandler = (err, req, res, next) => {
    if (err.name === 'JsonWebTokenError') {
        err = new AppError('Invalid Token', 401)
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        err = new AppError(err.errors[0].message, 400)
    }
    if (err.name === 'notNull Violation') {
        err = new AppError(err.errors[0].message, 400)
    }
    if (err.name === 'SequelizeValidationError') {
        err = new AppError(err.errors[0].message, 400)
    }
    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, res)
    }

    return sendErrorProd(err, res)
}

module.exports = globalErrorHandler
