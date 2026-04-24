const repo = require('./customer.repositories');


class customerServices {

    async showCustomerData(){

        const result = await repo.showCustomerData();

        if(!result)throw new AppError('Failed to show customer data',500);

        return result;

    }

}

module.exports = new customerServices();