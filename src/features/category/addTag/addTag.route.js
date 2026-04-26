const router = require('express').Router();
const controller = require('./addTag.controller');
const {addTag,validate} = require('../../../middlewares/joi');
const auth = require('../../../middlewares/auth.middleware');

router.post('/addtag',validate(addTag),auth.authMiddle,controller.addTag);

module.exports = router;