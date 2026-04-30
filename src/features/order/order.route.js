const router = require('express').Router();
const controller = require('./order.controller');
const {validate,updateOrder,addOrder} = require('../../middlewares/joi');
const upload = require('../../middlewares/multer');
const auth = require('../../middlewares/auth.middleware');

router.get('/showadminorder',auth.authMiddle,controller.showOrderData);
router.get('/showmobileorder',auth.authMiddle,controller.showMobileOrderData);
router.put('/updateorderaction/:id',auth.authMiddle, validate(updateOrder), controller.updateOrderAction);
router.delete('/deleteorder/:id',auth.authMiddle,controller.deleteOrder);
router.post('/addorder',auth.authMiddle,upload.single('payment_image'),controller.addOrder);

module.exports = router;