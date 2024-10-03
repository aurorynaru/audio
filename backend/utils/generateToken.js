require('dotenv').config({ path: `${process.cwd}/.env` })
const jwt = require('jsonwebtoken')
const NodeCache = require('node-cache')
let tokenCache = null
if (!tokenCache) {
    tokenCache = new NodeCache({ stdTTL: 7 * 24 * 60 * 60 })
}

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

const deleteToken = (payload) => {
    tokenCache.del(payload.id)
}

module.exports = {
    generateToken,
    generateRefreshToken,
    deleteToken,
    tokenCache
}
