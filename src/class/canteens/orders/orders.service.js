const repo = require('./orders.repositories');


class CanteenOrderService{

    async CanteenAddOrder(payment_id,reciept_no,items,file){

        const result = await repo.CanteenAddOrder(payment_id,reciept_no,items,file);

        return result;

    }

    async ShowCanteenOrderData(){
        
        const result = await repo.ShowCanteenOrderData();

        return result;

    }

}

module.exports = new CanteenOrderService();