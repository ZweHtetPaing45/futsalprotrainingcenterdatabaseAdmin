const router = require('express').Router();
const controller = require('./deletetags.controller');
const {deleteTag,validate} = require('../../../middlewares/joi');

router.delete('/deletetag/:name',validate(deleteTag),controller.deleteName);

module.exports = router;