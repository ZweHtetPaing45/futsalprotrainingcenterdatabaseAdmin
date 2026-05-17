const router = require('express').Router();
const controller = require('./mobileBooking.controller');


router.get('/showmobilebooking',controller.ShowMobileBookingData);
router.delete('/deletemobilebooking/:id',controller.DeleteMobileBooking);

module.exports = router;