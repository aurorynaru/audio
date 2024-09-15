class AppError extends Error {
    constructor(message, statusCode) {
        super(Error)
        this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error'
        this.message = message
        this.isOperational = true
        Error.captureStackTrace(this, this.isOperational)
    }
}

module.exports = AppError
