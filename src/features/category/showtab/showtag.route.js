const router = require('express').Router();
const logger = require('../../../utils/logger');
const controller = require('./showtag.controller');
const auth = require('../../../middlewares/auth.middleware');

router.get('/showtags',auth.authMiddle,controller.showTag,(error)=>{
    logger.error({
        error: error.message,
        stack: error.stack
    })
});

module.exports = router;