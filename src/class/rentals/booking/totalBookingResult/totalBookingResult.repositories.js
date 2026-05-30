const com = require('../../../../config/com');
const AppError = require('../../../../utils/AppError');
const logger = require('../../../../utils/logger');



exports.BookingTotalResult = async ()=>{

    const [mobile_add] = await com.pool.query('select count(*) as mobile_add_booking from mobile_rental_booking;');

    const [admin_add] = await com.pool.query('select count(*) as admin_add_booking from admin_booking;');

    const [today_booking] = await com.pool.query(`
        SELECT 
(
    SELECT COUNT(*) 
    FROM admin_booking 
    WHERE create_at >= NOW() - INTERVAL 1 DAY
)
+
(
    SELECT COUNT(*) 
    FROM mobile_rental_booking 
    WHERE create_at >= NOW() - INTERVAL 1 DAY
)
AS todayBooking;
        `);

    const today_booking_count = today_booking[0].todayBooking;

    const mobile_add_booking = mobile_add[0].mobile_add_booking;
    const admin_add_booking = admin_add[0].admin_add_booking;

    const total_booking = mobile_add_booking + admin_add_booking;

    return {mobile_add_booking,admin_add_booking,today_booking_count,total_booking};

}