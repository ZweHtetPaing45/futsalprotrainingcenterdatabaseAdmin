const router = require('express').Router();
const controller = require('./deleteProduct.controller');
const {validate,deleteProduct} = require('../../../middlewares/joi');

router.delete('/deleteproduct/:id',validate(deleteProduct),controller.deleteProduct);

module.exports = router;