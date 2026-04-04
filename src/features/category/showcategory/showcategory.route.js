const router = require('express').Router();
const logger = require('../../../utils/logger');
const controller = require('./showcategory.controller');

router.get('/showcategory',controller.showCategory,(error)=>{
    logger.error({
        error: error.message,
        stack: error.stack
    })
});

module.exports = router;
