require('dotenv').config({ path: `${process.env.cwd}/.env` })
const fs = require('fs')
const path = require('path')

const getParams = (data, img = 'profilePic') => {
    console.log(data)
    let folderName = ''

    if (data.mimetype.startsWith('audio')) {
        folderName = 'audio'
    } else if (data.mimetype.startsWith('image')) {
        folderName = 'images'
    } else {
        folderName = 'others'
    }

    let bucketName = process.env.BUCKET_NAME_MODEL

    let key = `${data.path.split(`\\`)[2]}`

    if (folderName === 'images') {
        bucketName = process.env.BUCKET_NAME_MODEL_IMG
        if (img === 'profilePic') {
            key = 'avatar/' + key
        }
        if (img === 'cover') {
            key = 'cover/' + key
        }
    }

    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fs.createReadStream(data.path),
        ContentType: data.mimetype
    }

    return params
}

const getSignedParams = (key, filename) => {
    if (key === 'audioKey') {
        return {
            Bucket: process.env.BUCKET_NAME_MODEL,
            Key: filename
        }
    } else {
        return {
            Bucket: process.env.BUCKET_NAME_MODEL_IMG,
            Key: `cover/` + filename
        }
    }
}

module.exports = { getParams, getSignedParams }
