const router = require('express').Router();
const controller = require('./order.controller');
const {validate,updateOrder,addOrder} = require('../../middlewares/joi');
const upload = require('../../middlewares/multer');
const auth = require('../../middlewares/auth.middleware');

router.get('/showorder', auth.authMiddle,controller.showOrderData);
router.put('/updateorderaction/:id',auth.authMiddle, validate(updateOrder), controller.updateOrderAction);
router.delete('/deleteorder/:id',auth.authMiddle,controller.deleteOrder);
router.post('/addorder', upload.single('payment_image'),auth.authMiddle,controller.addOrder);

module.exports = router;