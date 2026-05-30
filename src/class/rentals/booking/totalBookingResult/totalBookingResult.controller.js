const service = require('./totalBookingResult.service');


class TotalBookingController{

    async BookingTotalResult(req,res,next){

        const result = await service.BookingTotalResult();

        if(result){
                res.status(201).json({
                    success: true,
                    message: 'Total Booking successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Total Booking not show data list',
                    data: result
                });
            }

    }

}

module.exports = new TotalBookingController();