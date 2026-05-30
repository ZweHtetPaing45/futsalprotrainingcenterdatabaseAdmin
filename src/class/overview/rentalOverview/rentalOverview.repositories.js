const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');


exports.ShowRentalOverview = async ()=>{

    const [result] =await com.pool.query(' select (select count(*) from mobile_rental_booking) + (select count(*) from admin_booking) as total_court_booking');

    if(!result)throw new AppError('Failed to get total court booking',500);


    const [rentalRevenue] = await com.pool.query(`
                SELECT
            COALESCE(
                (SELECT SUM(amount)
                FROM admin_booking
                WHERE DATE(create_at) = CURDATE()),
                0
            )
            +
            COALESCE(
                (SELECT SUM(amount)
                FROM mobile_rental_booking
                WHERE DATE(create_at) = CURDATE()),
                0
            ) AS today_rental_revenue`);

    if(!rentalRevenue)throw new AppError('Failed to get rental revenue',500);

    const [total_equipment] = await com.pool.query(`
        SELECT
            COALESCE(
                (SELECT SUM(total)
                FROM admin_booking_equipment
                WHERE DATE(create_at) = CURDATE()),
                0
            )
            +
            COALESCE(
                (SELECT SUM(total)
                FROM mobile_rental_booking_equipment
                WHERE DATE(create_at) = CURDATE()),
                0
            ) AS today_rental_revenue
        `)

    if(!total_equipment)throw new AppError('Failed to get equipment revenue',500);

    const [booking_trend] = await com.pool.query(`
                SELECT 
    YEAR(all_bookings.create_at) AS year,
    MONTH(all_bookings.create_at) AS month_num,
    MONTHNAME(all_bookings.create_at) AS month_name,
    COUNT(*) AS total_booking
FROM (
    SELECT create_at FROM admin_booking
    UNION ALL
    SELECT create_at FROM mobile_rental_booking
) AS all_bookings
GROUP BY 
    YEAR(all_bookings.create_at),
    MONTH(all_bookings.create_at),
    MONTHNAME(all_bookings.create_at)
ORDER BY year, month_num;
        `);


        if(!booking_trend)throw new AppError('Failed to get booking trend',500);

    const total_court_booking = result[0].total_court_booking;
    const today_rental_revenue = Number(rentalRevenue[0].today_rental_revenue);
    const today_equipment_revenue = Number(total_equipment[0].today_rental_revenue);
    const monthly_booking_trend = booking_trend;

    return {
        total_court_booking,
        today_rental_revenue,
        today_equipment_revenue,
        monthly_booking_trend
    }

}