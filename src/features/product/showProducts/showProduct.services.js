const AppError = require('../../../utils/AppError');
const repo = require('./showProduct.repositories');

class showProductServices{


    async showProduct(){

        const result = await repo.showProducts();

        if(!result)throw new AppError('Failed to show products',500);

        return result;

    }
}

module.exports = new showProductServices();