const router = require('express').Router();
const controller = require('./localBooking.controller');
const upload = require('../../../../middlewares/multer');


router.post('/addlocalbooking',upload.single('payment_image'),controller.AdminBooking);
router.get('/showlocalbooking',controller.ShowLocalBookingData);
router.delete('/deletelocalbooking/:id',controller.DeleteLocalBooking);

module.exports = router;