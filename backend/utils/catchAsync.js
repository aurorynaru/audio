const catchAsync = async (fn) => {
    const errorHandler = async (req, res, next) => {
        fn(req, res, next).catch(next)
    }

    return errorHandler
}

module.exports = catchAsync
