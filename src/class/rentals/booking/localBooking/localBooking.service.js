const repo = require('./localBooking.repositories');


class localBookingService {

    async AdminBooking(venue_id,court_id,payment_id,reciept_no,date,court_time_slot_ids,department,items,file){

        const result = await repo.AdminBooking(venue_id,court_id,payment_id,reciept_no,date,court_time_slot_ids,department,items,file);

        return result;

    }

}

module.exports = new localBookingService();