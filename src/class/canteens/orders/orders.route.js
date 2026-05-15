const router = require('express').Router();
const controller = require('./orders.controller');
const upload = require('../../../middlewares/multer');

router.post('/addcanteenorder',upload.single('payment_image'),controller.CanteenAddOrder);
router.get('/showcanteenorder',controller.ShowCanteenOrderData);

module.exports = router;