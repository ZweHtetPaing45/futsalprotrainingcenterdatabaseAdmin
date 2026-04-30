const router = require('express').Router();
const controller = require('./payment&tax.controller');
const upload = require('../../../middlewares/multer');
const auth = require('../../../middlewares/auth.middleware');

router.post('/addpayment',auth.authMiddle,upload.single('payment_image'),controller.addingPayment);
router.put('/updatepayment/:id',auth.authMiddle,upload.single('payment_image'),controller.updatePayment);
router.delete('/deletepayment/:id',auth.authMiddle,controller.deletePayment);
router.get('/showpayment',auth.authMiddle,controller.showPayment);
router.post('/addtax',auth.authMiddle,controller.addingTax);
router.put('/updatetax/:id',auth.authMiddle,controller.updateTax);

module.exports = router;