const router = require('express').Router();
const controller = require('./totalBookingResult.controller');

router.get('/totalresult',controller.BookingTotalResult);

module.exports = router;