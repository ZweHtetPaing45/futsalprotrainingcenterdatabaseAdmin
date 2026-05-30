const repo = require('./trainingOverview.repositories');


class TrainingOverviewService{

    async ShowTrainingOverview(){

        const result = await repo.ShowTrainingOverview();

        return result;

    }

}

module.exports = new TrainingOverviewService();