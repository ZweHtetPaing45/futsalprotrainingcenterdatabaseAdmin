const router = require('express').Router();
const controller = require('./updateTags.controller');


router.put('/updatetag',controller.updateTag);

module.exports = router;