require('dotenv').config()

const accessKeyId = process.env.S3_BUCKET_ACCESS_KEY
const secretAccessKey = process.env.S3_BUCKET_ACCESS_SECRET
const region = process.env.S3_BUCKET_REGION
const bucketName = process.env.S3_BUCKET_NAME

var S3 = require('aws-sdk/clients/s3')
const fs = require("fs")


const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

function uploadFile(file) {
  let fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName, 
    Key: file.filename, 
    Body: fileStream
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

function getFileStream(fileKey) {
  const downloadParams = {
      Bucket: bucketName,
      Key: fileKey,
  }

  let fileStream = s3.getObject(downloadParams).createReadStream()
  return fileStream
}
exports.getFileStream = getFileStream
