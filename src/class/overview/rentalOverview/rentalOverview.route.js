const router = require('express').Router();
const controller = require('./rentalOverview.controller');

router.get('/showrentaloverview',controller.ShowRentalOverview);

module.exports = router;