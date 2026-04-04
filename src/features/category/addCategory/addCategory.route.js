const router = require('express').Router();
const controller = require('./addCategory.controller');
const uploads = require('../../../middlewares/multer');
const {addCategories,validate} = require('../../../middlewares/joi');


router.post('/addCategories',validate(addCategories),uploads.single('image'),controller.addCategory);

module.exports = router;