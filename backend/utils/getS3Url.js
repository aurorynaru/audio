const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const s3 = require('./s3Client')
const { GetObjectCommand } = require('@aws-sdk/client-s3')

const getS3Url = async (params, seconds = 259200) => {
    const command = new GetObjectCommand(params)
    return await getSignedUrl(s3, command, { expiresIn: seconds })
}

module.exports = getS3Url
