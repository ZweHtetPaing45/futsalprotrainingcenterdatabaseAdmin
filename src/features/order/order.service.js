const AppError = require('../../utils/AppError');
const repo = require('./order.repositories');

class orderService{


    async addOrder(file,customer_name,total_amount,payment_method,payment_name,phone,user_id){

        const addOrder = await repo.addOrder(file,customer_name,total_amount,payment_method,payment_name,phone,user_id);

        if(!addOrder) throw new AppError('Failed to add order',500);

        return addOrder;
        
    }


    async showOrderData(){

        const orderData = await repo.showOrderData();

        if(!orderData) throw new AppError('No order data found',404);

        return orderData;

    }

    async updateOrderAction(id,action){
        
        const updateOrderAction = await repo.updateOrderAction(id,action);

        if(!updateOrderAction) throw new AppError('Failed to update order action',400);

        return updateOrderAction;

    }

    async deleteOrder(id){
        const deleteOrder = await repo.deleteOrder(id);

        if(!deleteOrder) throw new AppError('Failed to delete order',400);

        return deleteOrder;
    }

}

module.exports = new orderService();