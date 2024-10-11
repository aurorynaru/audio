require('dotenv').config({ path: `${process.cwd()}/.env` })

const getAvatarUrl = (profilePicture) => {
    const bucketName = process.env.BUCKET_NAME_MODEL_IMG
    return `https://${bucketName}.s3.ap-southeast-1.amazonaws.com/avatar/${profilePicture}`
}

module.exports = getAvatarUrl
