const service = require('./report.service');


class ReportController{

    async ReportOverview(req,res,next){

        try{

            const result = await service.ReportOverview();

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Report overview data fetched successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Report overview data not fetched',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

}

module.exports = new ReportController();