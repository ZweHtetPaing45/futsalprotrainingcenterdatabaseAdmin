const router = require('express').Router();
const controller = require('./order.controller');
const {validate,updateOrder,addOrder} = require('../../middlewares/joi');
const upload = require('../../middlewares/multer');
// const auth = require('../../middlewares/auth.middleware');

//Get Method
router.get('/showadminorder',controller.showOrderData);
router.get('/showmobileorder',controller.showMobileOrderData);
router.get('/totalResult',controller.totalResult);
router.get('/totalmobileresult',controller.mobile_order_data);
router.get('/totaladminresult',controller.admin_order_data);

//Put Method
router.put('/updateorderaction/:id', validate(updateOrder), controller.updateOrderAction);
router.put('/updateadminaction/:id', validate(updateOrder), controller.updateAdminOrderAction);

//Delete Method
router.delete('/deleteadminorder/:id',controller.deleteOrder);
router.delete('/deletemobileorder/:id',controller.mobileDeleteOrder);

//Post Method
router.post('/addorder',upload.single('payment_image'),controller.addOrder);

module.exports = router;