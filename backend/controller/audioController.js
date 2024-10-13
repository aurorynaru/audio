const { GetObjectCommand } = require('@aws-sdk/client-s3')
const audio = require('../models/audio')
const user = require('../models/user')
const likeDislikes = require('../models/likedislike')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const getSignedUrl = require('@aws-sdk/s3-request-presigner')
const s3 = require('../utils/s3Client')
const getS3Url = require('../utils/getS3Url')
const { getParams, getSignedParams } = require('../utils/getParams')
const jwt = require('jsonwebtoken')
const replies = require('../models/reply')
const getAvatarUrl = require('../utils/getAvatarUrl')

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

    const audioResult = await audio.findAll({
        attributes: [
            'id',
            'title',
            'source',
            'audioKey',
            'coverKey',
            'createdBy',
            'createdAt'
        ],
        include: [
            {
                model: user,
                attributes: ['id']
            }
        ],
        limit: parseInt(limit), // limit the number of items
        offset: (page - 1) * limit // skip previous items
    })

    let idToken = ''
    let userId = null

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        idToken = req.headers.authorization.split(' ')[1]
        const tokenDetail = jwt.verify(
            idToken,
            process.env.JWT_TOKEN,
            (err, data) => {
                if (err) {
                    return false
                } else {
                    return data
                }
            }
        )

        if (tokenDetail) {
            userId = tokenDetail.id
        }

        // console.log(yo)

        // if (jwt.verify(idToken, process.env.JWT_TOKEN)) {
        //     const tokenDetail = jwt.verify(idToken, process.env.JWT_TOKEN)
        //     userId = tokenDetail.id
        // }
    }

    const result = await Promise.all(
        audioResult.map(async (data) => {
            const jsonData = data.toJSON()

            const paramsAudio = getSignedParams('audioKey', jsonData.audioKey)
            const paramsCover = getSignedParams('coverKey', jsonData.coverKey)

            const comments = await replies.findAll({
                where: { postId: jsonData.id, parentReplyId: null },
                include: {
                    model: user,
                    attributes: ['userName', 'email', 'profilePicture']
                },
                order: [['createdAt', 'DESC']]
            })

            const newComments = comments.map((comment) => {
                const commentJson = comment.toJSON()
                commentJson.User.profilePicture = getAvatarUrl(
                    commentJson.User.profilePicture
                )
                return commentJson
            })

            jsonData.audioKey = await getS3Url(paramsAudio)
            jsonData.coverKey = await getS3Url(paramsCover)

            const likesCount = await likeDislikes.count({
                where: { postId: jsonData.id, isLike: true }
            })
            const disLikesCount = await likeDislikes.count({
                where: { postId: jsonData.id, isLike: false }
            })
            if (userId != null) {
                const userInteraction = await likeDislikes.findOne({
                    where: { userId, postId: jsonData.id }
                })

                if (userInteraction) {
                    // If user has liked or disliked, store the value in jsonData
                    jsonData.isUserLikedDislike = userInteraction.isLike
                        ? 'liked'
                        : 'disliked'
                } else {
                    // If user has not interacted, mark as 'none'
                    jsonData.isUserLikedDislike = 'none'
                }
            } else {
                // If there's no user (not authenticated), mark as 'none'
                jsonData.isUserLikedDislike = 'none'
            }
            jsonData.likes = likesCount
            jsonData.dislikes = disLikesCount
            jsonData.comments = newComments

            return jsonData
        })
    )

    if (!result) {
        return next(new AppError('Error fetching audio', 500))
    }

    return res.status(200).json({
        result
    })
})

const getAudio = catchAsync(async (req, res, next) => {
    const { postId } = req.query

    const audioResult = await audio.findByPk(postId)

    if (!audioResult) {
        return next(new AppError('invalid postId', 400))
    }

    res.status(200).json({
        audioResult
    })
})

const sendComment = catchAsync(async (req, res, next) => {
    const { content, postId } = req.body

    let idToken = ''
    let userId = null

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        idToken = req.headers.authorization.split(' ')[1]
        const tokenDetail = jwt.verify(
            idToken,
            process.env.JWT_TOKEN,
            (err, data) => {
                if (err) {
                    return false
                } else {
                    return data
                }
            }
        )
        if (tokenDetail) {
            userId = tokenDetail.id
        }
    }

    const newReply = await replies.create(
        {
            content,
            postId,
            userId
        },
        {
            include: {
                model: user,
                attributes: ['userName', 'email', 'profilePicture']
            }
        }
    )

    if (!newReply) {
        next(new AppError('error sending the message', 401))
    }

    const replyData = await replies.findOne({
        where: { id: newReply.id },
        include: {
            model: user,
            attributes: ['userName', 'email', 'profilePicture']
        }
    })

    if (!replyData) {
        next(new AppError('error  retrieving user data', 401))
    }

    const result = replyData.toJSON()

    result.User.profilePicture = getAvatarUrl(result.User.profilePicture)

    return res.status(201).json({
        result
    })
})

const getAudioComments = catchAsync(async (req, res, next) => {
    const { postId } = req.body

    const result = await replies.findAll({
        where: { postId: postId, parentReplyId: null },
        order: [['createdAt', 'DESC']]
    })
    if (!result) {
        next(new AppError('error retrieving comments', 401))
    }

    return res.status(200).json({
        result
    })
})
module.exports = {
    createAudio,
    getAllAudio,
    getAudio,
    sendComment,
    getAudioComments
}
