const router = require('express').Router();
const controller = require('./canteenOverview.controller');

router.get('/showcanteenoverview',controller.ShowCanteenOverview);

module.exports = router;