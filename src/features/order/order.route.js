const router = require('express').Router();
const controller = require('./order.controller');
const {validate,updateOrder} = require('../../middlewares/joi');

router.get('/showorder', controller.showOrderData);
router.put('/updateorderaction', validate(updateOrder), controller.updateOrderAction);
router.delete('/deleteorder/:id',controller.deleteOrder);

module.exports = router;