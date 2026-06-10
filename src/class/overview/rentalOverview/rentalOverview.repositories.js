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

exports.ShowMobileBookingData = async ()=>{

    const [prindOrder] = await com.pool.query(`
         
                SELECT
                a.id,
                v.venue_name,
                c.court_name,
                p.payment_method,
                a.payment_image_url,
                a.name as Customer,
                DATE_FORMAT(a.create_at, '%Y-%m-%d') AS Date,
                DATE_FORMAT(a.create_at, '%h:%i:%s %p') AS Time,
                DATE_FORMAT(a.date, '%Y-%m-%d') AS date,
                a.rental as Court_Fee,
                a.amount as Total,

                JSON_ARRAYAGG(  
                    JSON_OBJECT(  
                        'equipment', e.product_name,  
                        'quantity', abe.quantity,  
                        'price', abe.price,  
                        'total', abe.total  
                    )  
                ) AS items

                FROM mobile_rental_booking a
                JOIN payment p ON p.id = a.payment_id
                JOIN venue v ON v.id = a.venue_id
                JOIN court c ON c.id = a.court_id
                LEFT JOIN mobile_rental_booking_equipment abe ON abe.mobile_rental_booking_id = a.id
                LEFT JOIN equipment e ON e.id = abe.equipment_id

                GROUP BY a.id;
                                `);

  
    return prindOrder;

}

exports.ShowBookingData = async ()=>{

    const [prindOrder] = await com.pool.query(`

                SELECT
                m.id,
                v.venue_name,
                c.court_name,
                COALESCE(p.payment_method, 'Cash') as payment_method,
                COALESCE(m.payment_image_url, 'Cash no photo') as payment_image_url,
                m.name as Customer,
                DATE_FORMAT(m.create_at, '%Y-%m-%d') AS Date,
                DATE_FORMAT(m.create_at, '%h:%i:%s %p') AS Time,
                DATE_FORMAT(m.date, '%Y-%m-%d') AS date,
                m.rental as Court_Fee,
                m.amount as Total,

                JSON_ARRAYAGG(  
                    JSON_OBJECT(  
                        'equipment', e.product_name,  
                        'quantity', abe.quantity,  
                        'price', abe.price,  
                        'total', abe.total  
                    )  
                ) AS items

                FROM mobile_rental_booking m
                LEFT JOIN payment p ON p.id = m.payment_id
                LEFT JOIN venue v ON v.id = m.venue_id
                LEFT JOIN court c ON c.id = m.court_id
                LEFT JOIN mobile_rental_booking_equipment abe ON abe.mobile_rental_booking_id = m.id
                LEFT JOIN equipment e ON e.id = abe.equipment_id

                GROUP BY m.id

                UNION ALL
         
                SELECT
                a.id,
                v.venue_name,
                c.court_name,
                COALESCE(p.payment_method, 'Cash') as payment_method,
                a.reciept_no,
                COALESCE(a.payment_image_url, 'Cash no photo') as payment_image_url,
                DATE_FORMAT(a.create_at, '%Y-%m-%d') AS Date,
                DATE_FORMAT(a.create_at, '%h:%i:%s %p') AS Time,
                DATE_FORMAT(a.date, '%Y-%m-%d') AS date,
                a.price as Court_Fee,
                a.amount as Total,

                JSON_ARRAYAGG(  
                    JSON_OBJECT(  
                        'equipment', e.product_name,  
                        'quantity', abe.quantity,  
                        'price', abe.price,  
                        'total', abe.total  
                    )  
                ) AS items

                FROM admin_booking a
                LEFT JOIN payment p ON p.id = a.payment_id
                LEFT JOIN venue v ON v.id = a.venue_id
                LEFT JOIN court c ON c.id = a.court_id
                LEFT JOIN admin_booking_equipment abe ON abe.booking_id = a.id
                LEFT JOIN equipment e ON e.id = abe.equipment_id

                GROUP BY a.id

                order by id DESC;
                                `);

    return prindOrder;

}