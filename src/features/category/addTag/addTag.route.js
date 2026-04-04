const router = require('express').Router();
const controller = require('./addTag.controller');
const {addTag,validate} = require('../../../middlewares/joi');

router.post('/addtag',validate(addTag),controller.addTag);

module.exports = router;