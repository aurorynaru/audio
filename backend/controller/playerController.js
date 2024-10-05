const audio = require('../models/audio')
const likeDislikes = require('../models/likedislike')
const user = require('../models/user')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

const LikeDislike = catchAsync(async (req, res, next) => {
    const { postId, isLike } = req.body

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
    // check if there is already a likedislike data from
    const checkLd = await likeDislikes.findOne({
        where: { userId: loginUser.id, postId: audioPost.id }
    })

    console.log('hengs?', checkLd)

    if (!checkLd) {
        await likeDislikes.create({
            isLike,
            userId,
            postId
        })
    } else {
        if (checkLd.isLike === isLike) {
            await likeDislikes.destroy({
                where: { id: checkLd.id }
            })
        } else {
            await likeDislikes.update(
                { isLike: !checkLd.isLike },
                {
                    where: { id: checkLd.id }
                }
            )
        }
    }

    const data = await likeDislikes.findByPk(postId)

    const userInteraction = await likeDislikes.findOne({
        where: { userId, postId: loginUser.id }
    })

    let isUserLikedDislike = ''

    if (userInteraction) {
        isUserLikedDislike = userInteraction.isLike ? 'liked' : 'disliked'
    } else {
        isUserLikedDislike = isUserLikedDislike.isUserLikedDislike = 'none'
    }

    const likesCount = await likeDislikes.count({
        where: { postId: postId, isLike: true }
    })
    const disLikesCount = await likeDislikes.count({
        where: { postId: postId, isLike: false }
    })

    let interactionData = {}

    if (data) {
        interactionData = data.toJSON()

        interactionData.isUserLikedDislike = isUserLikedDislike
        interactionData.likes = likesCount
        interactionData.dislikes = disLikesCount
    } else {
        interactionData.isUserLikedDislike = isUserLikedDislike
        interactionData.likes = likesCount
        interactionData.dislikes = disLikesCount
        interactionData.postId = postId
    }

    return res.status(200).json({
        interactionData
    })

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
