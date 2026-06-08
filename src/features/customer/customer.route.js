const router = require('express').Router();
const controller = require('./customer.controller');
// const auth = require('../../middlewares/auth.middleware');

router.get('/showcustomer',controller.showCustomerData);
router.put('/updatecustomer/:id/:warning',controller.WarningCustomer);

module.exports = router;