const router = require('express').Router();
const controller = require('./deletetags.controller');
const {deleteTag,validate} = require('../../../middlewares/joi');
// const auth = require('../../../middlewares/auth.middleware');

router.delete('/deletetag/:name',validate(deleteTag),controller.deleteName);

module.exports = router;