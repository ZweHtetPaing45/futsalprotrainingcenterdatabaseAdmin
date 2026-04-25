const controller = require('./customer.controller');
const router = require('express').Router();

router.get('/showcustomer',controller.showCustomerData);
router.delete('/deletecustomer/:id',controller.deleteCustomer);

module.exports = router;