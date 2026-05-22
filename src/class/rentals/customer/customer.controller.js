const service = require('./customer.service');


class CustomerController{

    async ShowMobileBookingData(req,res,next){

        try{

            const result = await service.ShowMobileBookingData();

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'mobile Booking list successfully',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

}

module.exports = new CustomerController();