const service = require('./order.service');

class orderController{

    async showOrderData(req,res,next){
        try {

            const orderData = await service.showOrderData();

            if(!orderData) throw new AppError('No order data found',404);

            res.status(200).json({
                status: 'success',
                data: orderData
            });

        }catch(error){
            next(error);
        }
    }

    async updateOrderAction(req,res,next){
        try{

            const {id,action} = req.body;

            if(!id || !action) throw new AppError('Please provide order id and action',400);

            console.log('id',id);
            console.log('action',action);

            const updateOrderAction = await service.updateOrderAction(id,action);

            if(!updateOrderAction) throw new AppError('Failed to update order action',400);

            res.status(200).json({
                status: 'success',
                message: 'Order action updated successfully',
                updateOrderAction
            });

        }catch(error){
            next(error);
        }
    }

    async deleteOrder(req,res,next){

        try{

            const id = req.params.id;

            console.log(id);

            const deleteOrder = await service.deleteOrder(id);

            if(!deleteOrder) throw new AppError('Failed to delete order',400);

            res.status(200).json({
                status: 'success',
                message: 'Order deleted successfully',
                deleteOrder
            });

        }catch(error){
            next(error);
        }

    }
}

module.exports = new orderController();