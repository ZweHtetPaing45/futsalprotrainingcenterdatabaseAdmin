const router = require('express').Router();
const logger = require('../../../utils/logger');
const controller = require('./showProduct.controller');
const auth = require('../../../middlewares/auth.middleware');

router.get('/showproduct',auth.authMiddle,controller.showProduct,(error)=>{
    logger.error({
        error: error.message,
        stack: error.stack
    });
});

module.exports = router;