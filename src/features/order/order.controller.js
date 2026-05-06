const service = require('./order.service');

class orderController{


    async addOrder(req,res,next){
        try{

               const file = req.file;

               const {payment_method,items,reciept_no} = req.body;


               console.log('file',file);

               console.log('payment_method',payment_method);

               console.log('items',items);

               console.log('reciept_no',reciept_no);

                if(!payment_method || !items || !file) throw new AppError('Please provide all required fields',400);

                const addOrder = await service.addOrder(file,payment_method,items,reciept_no);

                if(!addOrder) throw new AppError('Failed to add order',500);

                res.status(201).json({
                    status: 'success',
                    message: 'Order added successfully',
                    data: addOrder
                });

        }catch(error){
            next(error);
        }
    }

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

    async showMobileOrderData(req,res,next){
        try{

            const orderData = await service.showMobileOrderData();

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
            const id = req.params.id;

            console.log(id);

            const {action} = req.body;

            if(!action) throw new AppError('Please provide order id and action',400);

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

    async totalResult(req,res,next){
        try{

            const totalResult = await service.totalResult();

            if(!totalResult) throw new AppError('Failed to get total result',400);

            res.status(200).json({
                status: 'success',
                message: 'Total result shown successfully',
                totalResult
            });

        }catch(error){
            next(error);
        }
    }
}

module.exports = new orderController();