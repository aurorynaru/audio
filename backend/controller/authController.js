const catchAsync = require('../utils/catchAsync')
const user = require('../models/user')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

const s3 = require('../utils/s3Client')
const AppError = require('../utils/appError')

const signUp = catchAsync(async (req, res, next) => {
    const profilePicture = req.file.path.split(`\\`)[2]
    const { email, userName, password, confirmPassword } = req.body

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
    const { password, userName, email } = req.body
    console.log(req.body)
    let query = {}

    if (!password || (!userName && !email)) {
        return res.status(400).json({ message: 'missing' })
    }

    if (userName) {
        query.userName = userName
    } else {
        query.email = email
    }

    const result = await user.findOne({ where: query })

    if (!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('not found', 401))
    }

    const newRes = result.toJSON()
    const token = generateToken({ id: result.id })

    const getAvatarUrl = (profilePicture) => {
        const bucketName = process.env.BUCKET_NAME_MODEL_IMG
        return `https://${bucketName}.s3.ap-southeast-1.amazonaws.com/avatar/${profilePicture}`
    }

    return res.status(200).json({
        message: 'yes',
        token,
        imgUrl: getAvatarUrl(result.profilePicture)
    })
})

module.exports = { signUp, logIn }
