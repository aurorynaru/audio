const { GetObjectCommand } = require('@aws-sdk/client-s3')
const audio = require('../models/audio')
const user = require('../models/user')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const getSignedUrl = require('@aws-sdk/s3-request-presigner')
const s3 = require('../utils/s3Client')
const getS3Url = require('../utils/getS3Url')
const { getParams, getSignedParams } = require('../utils/getParams')

const createAudio = catchAsync(async (req, res, next) => {
    const userId = req.user.id
    let coverKey = ''
    let audioKey = ''

    req.files.forEach((element) => {
        if (element.mimetype.startsWith('image')) {
            coverKey = element.path.split(`\\`)[2]
        }
        if (element.mimetype.startsWith('audio')) {
            audioKey = element.path.split(`\\`)[2]
        }
    })
    const { title } = req.body

    let source = req.body.body

    if (source === undefined) {
        source = ['N/A']
    }

    const newAudio = await audio.create({
        title,
        source,
        coverKey,
        audioKey,
        createdBy: userId
    })

    if (!newAudio) {
        return next(new AppError('fail', 400))
    }

    const result = newAudio.toJSON()

    delete result.deletedAt

    req.body.user = {
        result
    }

    next()
})

const getAllAudio = catchAsync(async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query
    const result = await audio.findAll({
        attributes: [
            'id',
            'title',
            'source',
            'audioKey',
            'coverKey',
            'createdBy',
            'createdAt'
        ],
        include: {
            model: user,
            attributes: ['id']
        },
        limit: parseInt(limit), // limit the number of items
        offset: (page - 1) * limit // skip previous items
    })
    await Promise.all(
        result.map(async (data) => {
            const paramsAudio = getSignedParams('audioKey', data.audioKey)
            const paramsCover = getSignedParams('coverKey', data.coverKey)

            data.audioKey = await getS3Url(paramsAudio)
            data.coverKey = await getS3Url(paramsCover)
        })
    )

    if (!result) {
        return next(new AppError('Error fetching audio', 500))
    }

    return res.status(200).json({
        result
    })
})

module.exports = { createAudio, getAllAudio }
