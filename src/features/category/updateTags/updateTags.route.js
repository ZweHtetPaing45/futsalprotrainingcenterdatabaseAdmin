const router = require('express').Router();
const controller = require('./updateTags.controller');
// const auth = require('../../../middlewares/auth.middleware');

router.put('/updatetag',controller.updateTag);

module.exports = router;