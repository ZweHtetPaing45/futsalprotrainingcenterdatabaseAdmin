const router = require('express').Router();
const logger = require('../../../utils/logger');
const controller = require('./showtag.controller');

router.get('/showtags',controller.showTag,(error)=>{
    logger.error({
        error: error.message,
        stack: error.stack
    })
});

module.exports = router;