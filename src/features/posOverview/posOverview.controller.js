const service = require('./posOverview.service');


class posOverviewController {

    async getPosOverview(req,res,next){
        try {
            
            const result = await service.getPosOverview();
            res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new posOverviewController();