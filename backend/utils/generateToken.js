require('dotenv').config({ path: `${process.cwd}/.env` })
const NodeCache = require('node-cache')
const tokenCache = new NodeCache({ stdTTL: 7 * 24 * 60 * 60 })
const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const generateRefreshToken = (payload) => {
    const refreshToken = jwt.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: process.env.REFRESH_JWT_EXPIRES_IN
    })
    tokenCache.set(payload.id, refreshToken)

    return refreshToken
}

module.exports = { generateToken, generateRefreshToken, tokenCache }
