const catchAsync = require('../utils/catchAsync')
const NodeCache = require('node-cache')
const user = require('../models/user')
const bcrypt = require('bcrypt')
const {
    generateToken,
    generateRefreshToken
} = require('../utils/generateToken')

const s3 = require('../utils/s3Client')
const AppError = require('../utils/appError')

const signUp = catchAsync(async (req, res, next) => {
    const profilePicture = req.file.path.split(`\\`)[2]

    const { email, userName, password, confirmPassword } = req.body
    console.log(req.body)
    let bio = req.body.bio

    if (bio === undefined) {
        bio = 'yo'
    }

    const newUser = await user.create({
        email,
        userName,
        password,
        confirmPassword,
        bio,
        profilePicture
    })

    if (!newUser) {
        return next(new AppError('fail', 400))
    }

    const result = newUser.toJSON()

    delete result.password
    delete result.deletedAt

    result.token = generateToken({
        id: result.id
    })

    req.body.user = {
        result
    }

    next()
})

const logIn = catchAsync(async (req, res, next) => {
    const { password, userName, email, userCred } = req.body

    let query = {}

    if (!password || !userCred) {
        return res
            .status(401)
            .json({ message: 'Invalid password or email/username' })
    }
    //username
    // console.log(/^[A-Z\d][A-Z\d_-]{3,16}$/i.test(userCred))
    //email
    // console.log(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userCred))

    if (/^[A-Z\d][A-Z\d_-]{3,16}$/i.test(userCred)) {
        query.userName = userCred
    } else {
        query.email = userCred
    }

    const result = await user.findOne({ where: query })

    if (!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('Invalid password or email/username', 401))
    }

    const newRes = result.toJSON()

    for (const [key, value] of Object.entries(newRes)) {
        if (!['userName', 'email', 'bio'].includes(key)) {
            delete newRes[key]
        }
    }

    const getAvatarUrl = (profilePicture) => {
        const bucketName = process.env.BUCKET_NAME_MODEL_IMG
        return `https://${bucketName}.s3.ap-southeast-1.amazonaws.com/avatar/${profilePicture}`
    }

    newRes.imgUrl = getAvatarUrl(result.profilePicture)

    const accessToken = generateRefreshToken({ id: result.id })
    const refreshToken = generateRefreshToken({ id: result.id })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        path: '/'
    })

    const userData = {
        message: 'Login successful',
        accessToken,
        user: newRes
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    return res.status(200).json(userData)
})

module.exports = { signUp, logIn }
