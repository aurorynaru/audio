const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const fileSizeLimitErrorHandler = catchAsync((err, req, res, next) => {
    if (err || err.code === 'LIMIT_FILE_SIZE') {
        return next(new AppError('File size exceeds limit', 413))
    }
})

module.exports = fileSizeLimitErrorHandler
