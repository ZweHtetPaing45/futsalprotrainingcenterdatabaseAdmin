const repo = require('./customer.repositories');


class customerServices {

    async showCustomerData(){

        const result = await repo.showCustomerData();

        if(!result)throw new AppError('Failed to show customer data',500);

        return result;

    }

    async deleteCustomer(id){

        const result = await repo.deleteCustomer(id);

        return result;

    }

    async WarningCustomer(id,warning){

        const result = await repo.WarningCustomer(id,warning);

        return result;

    }

}

module.exports = new customerServices();