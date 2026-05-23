const repo = require('./posOverview.repositories');


class posOverviewService{

    async getPosOverview(){

        const result = await repo.getPosOverview();

        return result;

    }

}

module.exports = new posOverviewService();