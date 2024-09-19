require('dotenv').config({ path: `${process.cwd()}/.env` })
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3')
const catchAsync = require('../utils/catchAsync')
const { Upload } = require('@aws-sdk/lib-storage')
const fs = require('fs')
const path = require('path')
const s3 = require('../utils/s3Client')
const getParams = require('../utils/getParams')
const AppError = require('../utils/appError')
const checkFileSize = require('../middleware/fileSize')

const uploadAvatar = catchAsync(async (req, res, next) => {
    try {
        const params = getParams(req.file)
        // const saveFile = new PutObjectCommand(params)
        // await s3.send(saveFile)

        const parallelUploads3 = new Upload({
            client: s3,
            params: params
        })

        parallelUploads3.on('httpUploadProgress', (progress) => {
            console.log(
                progress.Key.split('-')[1],
                Math.floor((progress.loaded / progress.total) * 100, '%')
            )
        })

        await parallelUploads3.done()
    } catch (error) {
        return next(new AppError(error, 400))
    }

    try {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting file from local disk:', err)
            } else {
                console.log(
                    `${
                        req.file.path.split(`\\`)[2]
                    } successfully deleted from local disk.`
                )
            }
        })
    } catch (error) {
        return next(new AppError(error, 400))
    }

    return res.status(201).json({
        message: 'user Created',
        resultUser: req.body.user.result
    })
})

const uploadFiles = catchAsync(async (req, res, next) => {
    // for (const element of req.files) {
    //     if (element.mimetype.startsWith('image')) {
    //         if (checkFileSize(element.size, 5250000)) {
    //             return next(new AppError('Image file too large', 400))
    //         }
    //     }

    //     if (element.mimetype.startsWith('audio')) {
    //         if (checkFileSize(element.size, 5250000)) {
    //             return next(new AppError('Audio file too large', 400))
    //         }
    //     }
    // }
    await Promise.all(
        req.files.map(async (element) => {
            try {
                const params = getParams(element)
                // const saveFile = new PutObjectCommand(params)
                // await s3.send(saveFile)

                const parallelUploads3 = new Upload({
                    client: s3,
                    params: params
                })

                parallelUploads3.on('httpUploadProgress', (progress) => {
                    console.log(
                        progress.Key.split('-')[1],
                        Math.floor(
                            (progress.loaded / progress.total) * 100,
                            '%'
                        )
                    )
                })

                await parallelUploads3.done()
            } catch (error) {
                return next(new AppError(error, 400))
            }
        })
    )

    await Promise.all(
        req.files.map((element) => {
            try {
                fs.unlink(element.path, (err) => {
                    if (err) {
                        console.error(
                            'Error deleting file from local disk:',
                            err
                        )
                    } else {
                        console.log(
                            `${
                                element.path.split(`\\`)[2]
                            } successfully deleted from local disk.`
                        )
                    }
                })
            } catch (error) {
                return next(new AppError(error, 400))
            }
        })
    )

    //   const params = {
    //             Bucket: process.env.BUCKET_NAME_MODEL,
    //             Key: req.files[1].originalname,
    //             Body: fs.createReadStream(req.files[1].path),
    //             ContentType: req.files[1].mimetype
    //         }

    //         const saveSmall = new PutObjectCommand(params)
    //         await s3.send(saveSmall)

    return res.status(200).json({
        message: 'files uploaded.'
    })
})

module.exports = { uploadFiles, uploadAvatar }
