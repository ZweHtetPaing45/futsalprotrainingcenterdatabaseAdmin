const repo = require('./orders.repositories');


class CanteenOrderService{

    async CanteenAddOrder(payment_method,reciept_no,items,file){

        const result = await repo.CanteenAddOrder(payment_method,reciept_no,items,file);

        return result;

    }

    async ShowCanteenOrderData(){
        
        const result = await repo.ShowCanteenOrderData();

        return result;

    }

    async TotalCanteenOrder(){

        const result = await repo.TotalCanteenOrder();

        return result;

    }

}

module.exports = new CanteenOrderService();