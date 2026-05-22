const repo = require('./customer.repositories');


class CustomerService{

    async ShowMobileBookingData(){

        const result = await repo.ShowMobileBookingData();

        return result;

    }

}

module.exports = new CustomerService();