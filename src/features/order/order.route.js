const router = require('express').Router();
const controller = require('./order.controller');
const {validate,updateOrder,addOrder} = require('../../middlewares/joi');
const upload = require('../../middlewares/multer');
// const auth = require('../../middlewares/auth.middleware');

router.get('/showadminorder',controller.showOrderData);
router.get('/showmobileorder',controller.showMobileOrderData);
router.put('/updateorderaction/:id', validate(updateOrder), controller.updateOrderAction);
router.delete('/deleteadminorder/:id',controller.deleteOrder);
router.delete('/deletemobileorder/:id',controller.mobileDeleteOrder);
router.post('/addorder',upload.single('payment_image'),controller.addOrder);
router.get('/totalResult',controller.totalResult);

module.exports = router;