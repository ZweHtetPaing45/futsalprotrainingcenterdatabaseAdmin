const repo = require('./mobileBooking.repositories');


class MobileBookingService{

    async ShowMobileBookingData(){
        
        const result = await repo.ShowMobileBookingData();

        return result;

    }
    
    async DeleteMobileBooking(id){

        const result = await repo.DeleteMobileBooking(id);

        return result;

    }

}

module.exports = new MobileBookingService();