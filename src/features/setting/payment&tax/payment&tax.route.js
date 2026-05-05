const router = require('express').Router();
const controller = require('./payment&tax.controller');
const upload = require('../../../middlewares/multer');
// const auth = require('../../../middlewares/auth.middleware');

router.post('/addpayment',upload.single('payment_image'),controller.addingPayment);
router.put('/updatepayment/:id',upload.single('payment_image'),controller.updatePayment);
router.delete('/deletepayment/:id',controller.deletePayment);
router.get('/showpayment',controller.showPayment);
router.post('/addtax',controller.addingTax);
router.put('/updatetax/:id',controller.updateTax);
router.get('/showtax',controller.showTax);

module.exports = router;