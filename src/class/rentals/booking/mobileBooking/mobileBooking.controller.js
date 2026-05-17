const service = require('./mobileBooking.service');


class MobileBookingController{

    async ShowMobileBookingData(req,res,next){

        try{

            const result = await service.ShowMobileBookingData();

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'mobile Booking list successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'mobile Booking not show data list',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async DeleteMobileBooking(req,res,next){

        try{

            const id = req.params.id;

            const result = await service.DeleteMobileBooking(id);

             if(result){
                res.status(201).json({
                    success: true,
                    message: 'Mobile Booking Delete successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Mobile Booking not delete',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

}

module.exports = new MobileBookingController();