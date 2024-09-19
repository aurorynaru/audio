const crypto = require('crypto')
const randText = (bytes = 16) => {
    return crypto.randomBytes(bytes).toString('hex')
}

module.exports = randText
