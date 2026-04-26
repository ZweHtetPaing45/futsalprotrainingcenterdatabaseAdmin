const controller = require('./customer.controller');
const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');

router.get('/showcustomer',auth.authMiddle,controller.showCustomerData);
router.delete('/deletecustomer/:id',auth.authMiddle,controller.deleteCustomer);

module.exports = router;