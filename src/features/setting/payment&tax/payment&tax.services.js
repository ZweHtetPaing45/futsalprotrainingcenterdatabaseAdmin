const repo = require('./payment&tax.repositories');


class paymentandtaxservice{


    // payment CRUD
    async addingPayment(payment_method,payment_name,payment_number,file){

        const result = await repo.addPayment(payment_method,payment_name,payment_number,file);

        return true;
    }

    async updatePayment(id,payment_method,payment_name,payment_number,file){

        const result = await repo.updatePayment(id,payment_method,payment_name,payment_number,file);

        return result;

    }

    async deletePayment(id){

        const result = await repo.deletePayment(id);

        return result;

    }

    async showPayment(){

        const result = await repo.showPayment();

        return result;

    }


    //Tax

    async addingTax(tax){
        
        const result = await repo.addingTax(tax);

        return result;

    }

    async updateTax(id,tax){

        const result = await repo.updateTax(id,tax);

        return true;

    }

}

module.exports = new paymentandtaxservice();