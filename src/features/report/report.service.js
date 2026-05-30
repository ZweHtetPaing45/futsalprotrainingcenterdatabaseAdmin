const repo = require('./report.repositories');


class ReportService{

    async ReportOverview(){

        const result = await repo.ReportOverview();

        return result;

    }

}

module.exports = new ReportService();