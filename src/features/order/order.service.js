const AppError = require('../../utils/AppError');
const repo = require('./order.repositories');

class orderService{


    async addOrder(file,payment_method,items,reciept_no){

        const addOrder = await repo.addOrder(file,payment_method,items,reciept_no);

        if(!addOrder) throw new AppError('Failed to add order',500);

        return addOrder;
        
    }


    async showOrderData(){

        const orderData = await repo.showAdminOrderData();

        if(!orderData) throw new AppError('No order data found',404);

        return orderData;

    }

    async showMobileOrderData(){

        const orderData = await repo.showMobileOrderData();

        if(!orderData) throw new AppError('No order data found',404);    

        return orderData;

    }

    async updateOrderAction(id,action){
        
        const updateOrderAction = await repo.updateOrderAction(id,action);

        if(!updateOrderAction) throw new AppError('Failed to update order action',400);

        return updateOrderAction;

    }

    async updateAdminOrderAction(id,action){

        const updateAdminOrderAction = await repo.updateAdminOrderAction(id,action);

        if(!updateAdminOrderAction) throw new AppError('Failed to update order action',400);

        return updateAdminOrderAction;

    }

    async deleteOrder(id){
        const deleteOrder = await repo.deleteOrder(id);

        if(!deleteOrder) throw new AppError('Failed to delete order',400);

        return deleteOrder;
    }

    async totalResult(){
        
        const result = await repo.totalResult();

        return result;

    }

    async mobileDeleteOrder(id){

        const deleteMobileOrderResult = await repo.mobileDeleteOrder(id);

        return deleteMobileOrderResult;

    }

    async mobile_order_data(){

        const result = await repo.mobile_order_data();

        return result;

    }

    async admin_order_data(){

        const result = await repo.admin_order_data();

        return result;

    }

}

module.exports = new orderService();