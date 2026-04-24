const service = require('./customer.services');

class customerController{

    async showCustomerData(req,res,next){

        try{
            
            const showCustomerData = await service.showCustomerData();

            if(!showCustomerData) throw new AppError('Failed to show customer data',400);

            res.status(200).json({
                status: 'success',
                message: 'Customer data shown successfully',
                showCustomerData
            });

        }catch(error){
            next(error);
        }

    }

}

module.exports = new customerController();