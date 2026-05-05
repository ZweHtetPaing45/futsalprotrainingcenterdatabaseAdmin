const router = require('express').Router();
const controller = require('./updateCategory.controller');
const upload = require('../../../middlewares/multer');
// const auth = require('../../../middlewares/auth.middleware');

router.put('/updatecategory',upload.single('image'),controller.updateCategory);


module.exports = router;