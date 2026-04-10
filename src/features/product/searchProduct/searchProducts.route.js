const router = require('express').Router();
const controller = require('./searchProducts.controller');
const {validate,searchProduct} = require('../../../middlewares/joi');

router.get('/searchproduct/:name',validate(searchProduct),controller.searchProduct);

module.exports = router;