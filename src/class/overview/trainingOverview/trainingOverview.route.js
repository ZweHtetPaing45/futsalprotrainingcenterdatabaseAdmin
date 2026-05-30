const router = require('express').Router();
const controller = require('./trainingOverview.controller');

//Get Method
router.get('/showtrainingoverview',controller.ShowTrainingOverview);

module.exports = router;