const service = require('./canteenOverview.service');

class CanteenOverviewController{


    async ShowCanteenOverview(req,res,next){

        try{

            const result = await service.ShowCanteenOverview();

               if(result){
                res.status(201).json({
                    success: true,
                    message: 'Canteen overview data retrieved successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Canteen overview data not retrieved',
                    data: result
                });
            }


        }catch(error){
            next(error);
        }

    }

}

module.exports = new CanteenOverviewController();