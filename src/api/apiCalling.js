const router = require('express').Router();
const addProductRouter = require('../features/product/addProduct/addProduct.route');
const addCategoryRouter = require('../features/category/addCategory/addCategory.route');
const addTagRouter = require('../features/category/addTag/addTag.route');
const logger = require('../utils/logger');
const showProductRouter = require('../features/product/showProducts/showProduct.route');
const showCategoriesRouter = require('../features/category/showcategory/showcategory.route');
const showTagRouter = require('../features/category/showtab/showtag.route');

router.use('/product', addProductRouter,(error)=>{
    logger.error({
        message: error.message,
        stack: error.stack
    });
});
router.use('/categories',addCategoryRouter);
router.use('/tags',addTagRouter);
router.use('/showpro',showProductRouter);
router.use('/showcat',showCategoriesRouter);
router.use('/showtag',showTagRouter);

module.exports = router;