const fs = require('fs')
const path = require('path')

// Function to create directories if they don't exist
const ensureDirectories = () => {
    const directories = ['uploads/images', 'uploads/audio', 'uploads/others']
    directories.forEach((dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
    })
}

module.exports = ensureDirectories
