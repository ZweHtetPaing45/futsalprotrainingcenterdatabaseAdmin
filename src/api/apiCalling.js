const router = require('express').Router();
const addProductRouter = require('../features/product/addProduct/addProduct.route');
const addCategoryRouter = require('../features/category/addCategory/addCategory.route');
const addTagRouter = require('../features/category/addTag/addTag.route');
const logger = require('../utils/logger');
const showProductRouter = require('../features/product/showProducts/showProduct.route');
const showCategoriesRouter = require('../features/category/showcategory/showcategory.route');
const showTagRouter = require('../features/category/showtab/showtag.route');
const deleteCategoryRouter = require('../features/category/deleteCategory/deletecategory.route');
const deleteTagRouter = require('../features/category/deleteTags/deletetags.route');
const searchProductRouter = require('../features/product/searchProduct/searchProducts.route');
const deleteProductRouter = require('../features/product/deletProduct/deleteProduct.route');
const updateProductRouter = require('../features/product/updateProduct/updateProduct.route');
const updateCategoryRouter = require('../features/category/updateCategory/updateCategory.route');
const updateTagRouter = require('../features/category/updateTags/updateTags.route');
const orderRouter = require('../features/order/order.route');
const inventoryRouter = require('../features/inventory/inventory.route');
const customerRouter = require('../features/customer/customer.route');
const staffManagementRouter = require('../features/setting/staffManagement/staffManagement.route');
const authRouter = require('../features/auth/auth.route');
const generalSettingRouter = require('../features/setting/generalSetting/generalSetting.route');
const paymentRouter = require('../features/setting/payment&tax/payment&tax.route');


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
router.use('/deletecat',deleteCategoryRouter);
router.use('/deletetag',deleteTagRouter);
router.use('/search',searchProductRouter);
router.use('/deleteproducts',deleteProductRouter);
router.use('/updateshowproduct',updateProductRouter);
router.use('/updateCat',updateCategoryRouter);
router.use('/updateTag',updateTagRouter);
router.use('/order',orderRouter);
router.use('/inventory',inventoryRouter);
router.use('/customer',customerRouter);
router.use('/setting',staffManagementRouter);
router.use('/auth',authRouter);
router.use('/generalsetting',generalSettingRouter);
router.use('/payment',paymentRouter);

module.exports = router;