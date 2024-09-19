require('dotenv').config({ path: `${process.cwd}/.env` })
const jwt = require('jsonwebtoken')

const generateToken = (pl) => {
    return jwt.sign(pl, process.env.JWT_TOKEN, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

module.exports = generateToken
