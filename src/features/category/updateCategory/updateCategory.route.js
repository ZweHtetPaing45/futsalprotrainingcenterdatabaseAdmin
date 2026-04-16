const router = require('express').Router();
const controller = require('./updateCategory.controller');
const upload = require('../../../middlewares/multer');

router.put('/updatecategory',upload.single('image'),controller.updateCategory);


module.exports = router;