const repo = require('./canteenOverview.repositories');


class CanteenOverviewService{

    async ShowCanteenOverview(){

        const result = await repo.ShowCanteenOverview();
        
        return result;

    }

}

module.exports = new CanteenOverviewService();