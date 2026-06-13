const router = require('express').Router();
const controller = require('./customer.controller');
// const auth = require('../../middlewares/auth.middleware');

//Get Method
router.get('/showcustomer',controller.showCustomerData);

//Put Method
router.put('/updatecustomer/:id/:warning',controller.WarningCustomer);

//Delete Method
router.delete('/user/:id',controller.deleteCustomer);

module.exports = router;