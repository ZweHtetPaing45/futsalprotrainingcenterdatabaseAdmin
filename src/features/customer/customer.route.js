const controller = require('./customer.controller');
const router = require('express').Router();

router.get('/showcustomer',controller.showCustomerData);

module.exports = router;