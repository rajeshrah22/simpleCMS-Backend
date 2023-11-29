const genPage = require('./functions/genPage').genPage
const path = require('path')
const s3Access = require('../storage-db/s3Access')
const s3BucketPolicyGenerator = require('../config/s3BucketPolicyGenerator')

//this template location will change in the future
TEMPLATE_LOCATION = path.normalize(__dirname + '/../views/pages/tablePage.pug')
DESTINATION_DIR = path.normalize(__dirname + '/../public/index.html')
ERROR_PATH = path.normalize(__dirname + '/../public/error.html')


//incomplete
const createWebsite = async (req, res) => {
  //create html page
  genPage(TEMPLATE_LOCATION, req.file.path, DESTINATION_DIR)

  //create bucket with unique name using UNIX timestamp suffix
  const BUCKET_NAME = (req.body.name).toLowerCase() + Date.now()
  await s3Access.createBucket(BUCKET_NAME)
  console.log("bucket created")
  //put html and error file
  await s3Access.uploadFile(DESTINATION_DIR, BUCKET_NAME, "index.html")
  await s3Access.uploadFile(ERROR_PATH, BUCKET_NAME, "error.html")

  //set permissions
  await s3Access.deletePublicAccessBlock(BUCKET_NAME)
  await s3Access.putBucketPolicy(s3BucketPolicyGenerator.generateWesbiteBucketPolicy(BUCKET_NAME), BUCKET_NAME)

  //enable static website
  s3Access.configureWebsite(BUCKET_NAME)
}

module.exports = {
  createWebsite: createWebsite
}