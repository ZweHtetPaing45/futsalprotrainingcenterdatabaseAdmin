const router = require('express').Router();
const controller = require('./trainingOverview.controller');

//Get Method
router.get('/showtrainingoverview',controller.ShowTrainingOverview);
router.get('/training_overview',controller.TrainingStudentOverview);

module.exports = router;