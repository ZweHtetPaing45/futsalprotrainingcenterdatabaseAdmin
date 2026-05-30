const repo = require('./rentalOverview.repositories');


class RentalOverviewService{

    async ShowRentalOverview(){

        const result = await repo.ShowRentalOverview();

        return result;

    }

}

module.exports = new RentalOverviewService();