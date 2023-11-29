const genPage = require('./functions/genPage').genPage;
const path = require('path');
const s3Access = require('../storage-db/s3Access');
//this template location will change in the future
TEMPLATE_LOCATION = path.normalize(__dirname + '/../views/pages/tablePage.pug');
DESTINATION_DIR = path.normalize(__dirname + '/../public/index.html');


//incomplete
const createPage = async (req, res) => {
  //create html page
  genPage(TEMPLATE_LOCATION, req.file.path, DESTINATION_DIR)

  //create bucket with unique name using UNIX timestamp suffix
  const BUCKET_NAME = (req.body.name).toLowerCase() + Date.now();
  s3Access.createBucket(BUCKET_NAME);
  console.log("bucket created");
  //put html file
  //s3Access.uploadFile(DESTINATION_DIR, BUCKET_NAME, "index.html")
  //enable static website
}

module.exports = {
  createPage: createPage
}