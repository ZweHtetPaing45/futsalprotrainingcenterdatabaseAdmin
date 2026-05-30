const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');


exports.ShowRentalOverview = async ()=>{

    const [result] =await com.pool.query(' select (select count(*) from mobile_rental_booking) + (select count(*) from admin_booking) as total_court_booking');

    if(!result)throw new AppError('Failed to get total court booking',500);

    const total_court_booking = result[0].total_court_booking;

    return {
        total_court_booking
    }

}