const router = require('express').Router();
const controller = require('./orders.controller');
const upload = require('../../../middlewares/multer');

//Post Method
router.post('/addcanteenorder',upload.single('payment_image'),controller.CanteenAddOrder);

//Get Method
router.get('/showcanteenorder',controller.ShowCanteenOrderData);
router.get('/totalcanteenorder',controller.TotalCanteenOrder);

module.exports = router;