const experss = require('express')
const router = experss.Router()
const multer = require('multer')
const pageController = require('../controllers/pageController')
const path = require('path')

//constants
const UPLOAD_DEST = path.normalize(__dirname + '/../tmp')

//initialize multer to process file upload
const upload = multer({dest: UPLOAD_DEST})

router.route('/')
    .get((req, res) => {
      res.sendStatus(200).send("Hellow")
    })
    .post(upload.single('csv'), pageController.createWebsite)

module.exports = {
  router: router
}