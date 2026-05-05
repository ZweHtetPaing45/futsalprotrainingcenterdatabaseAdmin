const router = require('express').Router();
const controller = require('./searchProducts.controller');
const {validate,searchProduct} = require('../../../middlewares/joi');
// const auth = require('../../../middlewares/auth.middleware');

router.get('/searchproduct/:name',validate(searchProduct),controller.searchProduct);

module.exports = router;