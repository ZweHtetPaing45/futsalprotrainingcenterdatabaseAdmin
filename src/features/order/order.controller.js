const service = require('./order.service');

class orderController{


    async addOrder(req,res,next){
        try{

               const file = req.file;

               const {user_id,customer_name,total_amount,payment_method,payment_name,phone} = req.body;

            //    console.log('user_id',user_id);
            //    console.log('customer_name',customer_name);
            //    console.log('total_amount',total_amount);
            //    console.log('payment_method',payment_method);
            //    console.log('payment_name',payment_name);
            //    console.log('phone',phone);

                if(!customer_name || !total_amount || !payment_method || !payment_name || !phone) throw new AppError('Please provide all required fields',400);

                const addOrder = await service.addOrder(file,customer_name,total_amount,payment_method,payment_name,phone,user_id);

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
}

module.exports = new orderController();