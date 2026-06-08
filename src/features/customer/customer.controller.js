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

    async deleteCustomer(req,res,next){
        try{

            const id = req.params.id;

            const deleteResult = await service.deleteCustomer(id);

            if(!deleteResult) throw new AppError('Failed to delete customer data',400);

            res.status(200).json({
                status: 'success',
                message: 'Customer data deleted successfully',
                deleteResult
            });

        }catch(error){
            next(error);
        }
    }


    async WarningCustomer(req,res,next){
        try{

            const id = req.params.id;
            let warning = req.params.warning;

            warning = warning === 'true' ? 1 : 0;

            const result = await service.WarningCustomer(id,warning);

            if(result){
                res.status(200).json({
                    status: 'success',
                    message: 'Customer data updated successfully',
                    result
                });
            }else{
                res.status(400).json({
                    status: 'failed',
                    message: 'Customer data not updated',
                    result
                });
            }

        }catch(error){
            next(error);
        }
    }
}

module.exports = new customerController();