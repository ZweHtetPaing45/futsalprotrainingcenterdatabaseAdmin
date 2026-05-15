const service = require('./orders.service');
const AppError = require('../../../utils/AppError');


class CanteenOrderController{

    async CanteenAddOrder(req,res,next){

        try{

            const {payment_id,reciept_no,items} = req.body;

            const file = req.file;

            if(!payment_id || !reciept_no || !items || !file){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.CanteenAddOrder(payment_id,reciept_no,items,file);

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Order added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Order not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async ShowCanteenOrderData(req,res,next){

        try{

            const result = await service.ShowCanteenOrderData();

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Order added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Order not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

}

module.exports = new CanteenOrderController();