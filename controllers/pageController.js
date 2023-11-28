const genPage = require('./functions/genPage').genPage;
const path = require('path');
TEMPLATE_LOCATION = path.normalize(__dirname + '/../views/pages/tablePage.pug');
DESTINATION_DIR = path.normalize(__dirname + '/../public/index.html');


//incomplete
const createPage = (req, res) => {
  //create html page. also temporary template path
  genPage(TEMPLATE_LOCATION, req.file.path, DESTINATION_DIR)
  res.send('excecuted genPage');
  //create bucket
  //enable static website
}

module.exports = {
  createPage: createPage
}