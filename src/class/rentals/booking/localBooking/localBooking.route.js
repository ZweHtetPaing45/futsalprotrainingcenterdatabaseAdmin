const router = require('express').Router();
const controller = require('./localBooking.controller');
const upload = require('../../../../middlewares/multer');


router.post('/addlocalbooking',upload.single('payment_image'),controller.AdminBooking);


module.exports = router;