const service = require('./rentalOverview.service');


class RentalOverviewController{

    async ShowRentalOverview(req,res,next){

        try{

            const result = await service.ShowRentalOverview();

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Rental overview data retrieved successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Rental overview data not retrieved',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async ShowBookingData(req,res,next){

        try{

            const result = await service.ShowBookingData();

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Rental show data retrieved successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Rental data not retrieved',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

}

module.exports = new RentalOverviewController();