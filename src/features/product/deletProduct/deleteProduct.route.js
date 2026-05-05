const router = require('express').Router();
const controller = require('./deleteProduct.controller');
const {validate,deleteProduct} = require('../../../middlewares/joi');
// const auth = require('../../../middlewares/auth.middleware');

router.delete('/deleteproduct/:id',validate(deleteProduct),controller.deleteProduct);

module.exports = router;