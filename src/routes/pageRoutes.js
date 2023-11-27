const router = require('express').router;
const multer = require('multer');
const pageController = require('../controllers/pageController')

//constants
const UPLOAD_DEST = '../../tmp';

//initialize multer to process file upload
const upload = multer({dest: UPLOAD_DEST})

router.route('/')
    .post(upload.single('csv'), pageController.createPage)