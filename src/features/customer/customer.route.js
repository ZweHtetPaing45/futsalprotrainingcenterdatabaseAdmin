const controller = require('./customer.controller');
const router = require('express').Router();
// const auth = require('../../middlewares/auth.middleware');

router.get('/showcustomer',controller.showCustomerData);
router.delete('/deletecustomer/:id',controller.deleteCustomer);

module.exports = router;