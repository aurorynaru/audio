const audio = require('../models/audio')
const likeDislikes = require('../models/likedislike')
const user = require('../models/user')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

const LikeDislike = catchAsync(async (req, res, next) => {
    const { postId, isLike } = req.body
    console.log(req.body)

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

    const userId = loginUser.id

    if (!loginUser) {
        return next(new AppError('Invalid user', 401))
    }
    const audioPost = await audio.findByPk(postId)

    if (!audioPost) {
        return next(new AppError('Invalid post', 401))
    }

    const checkLd = await likeDislikes.findOne({
        where: { userId: loginUser.id }
    })

    if (!checkLd) {
        const uLd = await likeDislikes.create({
            isLike,
            userId,
            postId
        })

        return res.status(401).json({
            message: 'not liked yet',
            uLd
        })
    } else {
        const uLd = await likeDislikes.update(
            { isLike: !checkLd.isLike },
            {
                where: { id: postId }
            }
        )

        const data = await likeDislikes.findByPk(postId)

        return res.status(200).json({
            data
        })
    }

    // const ld = await likeDislikes.create({
    //     isLike,
    //     userId:loginUser.id,
    //     postId:audioPost.id

    // })
})

const getLikesAndDislikes = catchAsync(async (req, res, next) => {
    const { postId } = req.body

    const likesCount = await likeDislikes.count({
        where: { postId, isLike: true }
    })
    const disLikesCount = await likeDislikes.count({
        where: { postId, isLike: false }
    })
})

module.exports = { LikeDislike }
