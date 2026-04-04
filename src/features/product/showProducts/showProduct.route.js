const router = require('express').Router();
const logger = require('../../../utils/logger');
const controller = require('./showProduct.controller');

router.get('/showproduct',controller.showProduct,(error)=>{
    logger.error({
        error: error.message,
        stack: error.stack
    });
});

module.exports = router;