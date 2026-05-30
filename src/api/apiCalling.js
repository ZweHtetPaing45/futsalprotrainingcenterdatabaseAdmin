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
const menusRouter = require('../class/canteens/menus/menus.route');
const venueManagementRouter = require('../class/rentals/venueManagement/venueManagement.route');
const localBookingRouter = require('../class/rentals/booking/localBooking/localBooking.route');
const canteenOrderRouter = require('../class/canteens/orders/orders.route');
const rentalMobileBookingRouter = require('../class/rentals/booking/mobileBooking/mobileBooking.route');
const courseRouter = require('../class/trainings/course/course.route');
const bookingcustomerRouter = require('../class/rentals/customer/customer.route');
const posOverviewRouter = require('../features/posOverview/posOverview.route');
const courseManagementRouter = require('../class/trainings/courseManagement/courseManagement.route');
const courseStudentRouter = require('../class/trainings/students/courseStudent.route');
const totalbookingRouter = require('../class/rentals/booking/totalBookingResult/totalBookingResult.route');
const trainingOverviewRouter = require('../class/overview/trainingOverview/trainingOverview.route');
const rentalOverviewRouter = require('../class/overview/rentalOverview/rentalOverview.route');
const canteenOverviewRouter = require('../class/overview/canteenOverview/canteenOverview.route');
const reportRouter = require('../features/report/report.route');


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
router.use('/menus',menusRouter);
router.use('/venue',venueManagementRouter);
router.use('/localbooking',localBookingRouter);
router.use('/canteenorder',canteenOrderRouter);
router.use('/mobilerental',rentalMobileBookingRouter);
router.use('/course',courseRouter);
router.use('/bookingcustomer',bookingcustomerRouter);
router.use('/posoverview',posOverviewRouter);
router.use('/coursemanagement',courseManagementRouter);
router.use('/coursestudent',courseStudentRouter);
router.use('/totalbooking',totalbookingRouter);
router.use('/trainingoverview',trainingOverviewRouter);
router.use('/rentaloverview',rentalOverviewRouter);
router.use('/canteenoverview',canteenOverviewRouter);
router.use('/report',reportRouter);


module.exports = router;