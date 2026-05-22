const router = require('express').Router();
const controller = require('./customer.controller');


router.get('/showcustomer',controller.ShowMobileBookingData);

module.exports = router;