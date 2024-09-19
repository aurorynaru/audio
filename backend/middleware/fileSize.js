const checkFileSize = (fileSize, limit) => {
    if (fileSize > limit) {
        return true
    } else {
        return false
    }
}

module.exports = checkFileSize
