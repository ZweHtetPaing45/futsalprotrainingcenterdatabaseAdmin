const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');



exports.ShowMobileBookingData = async () => {

    const [result] = await com.pool.query(
`
        SELECT
            v.venue_name,

            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', a.id,
                    'name', a.name,
                    'phone', a.phone,
                    'court_name', c.court_name,
                    'date', DATE_FORMAT(a.date, '%Y-%m-%d'),

                    'time_slots',
                    (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'start_time', ts.start_time,
                                'end_time', ts.end_time
                            )
                        )
                        FROM mobile_rental_time_slot mrts
                        JOIN court_time_slot ts
                        ON ts.id = mrts.court_time_slot_id
                        WHERE mrts.mobile_rental_booking_id = a.id
                    ),

                    'remarks', a.remark
                )
            ) AS customers

        FROM mobile_rental_booking a

        JOIN venue v
        ON v.id = a.venue_id

        JOIN court c
        ON c.id = a.court_id

        GROUP BY v.id, v.venue_name
`
    );

    return result;
};