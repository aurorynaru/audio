const s3 = require('./s3Client')

const getImgUrl = async (params, seconds = 259200) => {
    const getImg = new GetObjectCommand(params)
    return await getSignedUrl(s3, getImg, { expiresIn: seconds })
}

module.exports = getImgUrl
