const repo = require('./rentalOverview.repositories');


class RentalOverviewService{

    async ShowRentalOverview(){

        const result = await repo.ShowRentalOverview();

        return result;

    }

    async ShowBookingData(){

        const result = await repo.ShowBookingData();

        return result;

    }

}

module.exports = new RentalOverviewService();