const router = require('express').Router();
const controller = require('./posOverview.controller');


router.get('/showposoverview',controller.getPosOverview);

module.exports = router;