const repo = require('./totalBookingResult.repositories');


class TotalBookingService{

    async BookingTotalResult(){

        const result = await repo.BookingTotalResult();

        return result;

    }

}

module.exports = new TotalBookingService();