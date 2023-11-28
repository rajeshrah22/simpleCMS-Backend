const genPage = require('./functions/genPage').genPage;
const path = require('path');
const s3Access = require('../storage-db/s3Access');
TEMPLATE_LOCATION = path.normalize(__dirname + '/../views/pages/tablePage.pug');
DESTINATION_DIR = path.normalize(__dirname + '/../public/index.html');


//incomplete
const createPage = (req, res) => {
  //create html page. also temporary template path
  genPage(TEMPLATE_LOCATION, req.file.path, DESTINATION_DIR)
  //create bucket
  s3Access.createBucket()
  //enable static website
}

module.exports = {
  createPage: createPage
}