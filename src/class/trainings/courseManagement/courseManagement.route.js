const router = require('express').Router();
const controller = require('./courseManagement.controller');
const upload = require('../../../middlewares/multer');

//POST Method
router.post('/addcourse',upload.single('category_card_image'),controller.AddCourse);


module.exports = router;