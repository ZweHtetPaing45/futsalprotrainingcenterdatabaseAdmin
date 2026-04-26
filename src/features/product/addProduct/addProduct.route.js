const router = require('express').Router();
const controller = require('./addProduct.controller');
const upload = require('../../../middlewares/multer');
const {createProduct,validate} = require('../../../middlewares/joi');
const logger = require('../../../utils/logger');
const auth = require('../../../middlewares/auth.middleware');

router.post('/addproduct',auth.authMiddle,validate(createProduct),upload.single('image'), controller.addProduct,(error)=>{
    logger.error({
        message: error.message,
        stack: error.stack
    });
});
module.exports = router;