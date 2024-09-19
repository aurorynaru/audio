import catchAsync from '../utils/catchAsync'

require('dotenv').config({ path: `${process.cwd()}/.env` })

export const checkFiles = catchAsync(async (req, res, next) => {
    try {
        console.log(req.files)
        console.log(req.body)
        const imageUpload = req.files.find((file) =>
            /^image\/(jpeg|png|jpg)$/i.test(file.mimetype)
        )
        let audioCount = 0
        let audioUpload = false

        req.files.forEach((file) => {
            const isAudioFile = /^audio\//i.test(file.mimetype)
            if (isAudioFile) {
                audioCount++
                audioUpload = true
            }

            if (audioCount > 1) {
                return next(new AppError('Maximum audio upload is 1', 400))
            }
        })

        req.body.fileUpload = {
            isAudio: audioUpload ? true : false,
            isImage: imageUpload ? true : false
        }

        next()
    } catch (error) {
        return next(new AppError(error, 400))
    }
})
