const router = require('express').Router();
const controller = require('./order.controller');
const {validate,updateOrder,addOrder} = require('../../middlewares/joi');
const upload = require('../../middlewares/multer');

router.get('/showorder', controller.showOrderData);
router.put('/updateorderaction/:id', validate(updateOrder), controller.updateOrderAction);
router.delete('/deleteorder/:id',controller.deleteOrder);
router.post('/addorder', upload.single('payment_image'), validate(addOrder),controller.addOrder);

module.exports = router;