const walkRepo = require('./walk-in.repositories');



class WalkInService{



    async addWalkIn(court_name,daily_price,capacity,open_at,close_at){

        const result = await walkRepo.addingWalkIn(court_name,daily_price,capacity,open_at,close_at);

        return result;

    }

    async bookingWalkIn(walk_in_id,payment_method,vanue_id,court_id,name,phone,date,items,file,department){
        
        const result = await walkRepo.walkInBooking(walk_in_id,payment_method,vanue_id,court_id,name,phone,date,items,file,department);

        return result;

    }

    async allWalkInList(){

        const result = await walkRepo.allWalkInBookingList();

        return result;

    }

    async mobileAllWalkInBookingList(){

        const result = await walkRepo.mobileAllWalkInBookingList();

        return result;

    }

    async allCourtWalkIn(){

        const result = await walkRepo.allCourtWalkIn();

        return result;

    }

    async updateWalkIn(daily_price,capacity,open_at,close_at,walk_in_id){

        const result = await walkRepo.updateWalkIn(daily_price,capacity,open_at,close_at,walk_in_id);

        return true;

    }

}


module.exports = new WalkInService();