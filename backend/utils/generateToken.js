require('dotenv').config({ path: `${process.cwd}/.env` })
const jwt = require('jsonwebtoken')
const NodeCache = require('node-cache')
const fs = require('fs')
const path = require('path')
const cacheFilePath = path.join(process.cwd(), 'tokenCache.json')

let tokenCache = null

if (!tokenCache) {
    tokenCache = new NodeCache({ stdTTL: 7 * 24 * 60 * 60 })
}

const saveCacheToFile = () => {
    const allKeys = tokenCache.keys()
    const cacheData = {}

    allKeys.forEach((key) => {
        const value = tokenCache.get(key)
        cacheData[key] = value
    })

    try {
        fs.writeFileSync(
            cacheFilePath,
            JSON.stringify(cacheData, null, 2),
            'utf-8'
        )
    } catch (err) {
        console.error('Error saving cache to file:', err)
    }
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
    saveCacheToFile()
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
