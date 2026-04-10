const AppError = require('../../../utils/AppError');
const repo = require('./updateProduct.repositories');



class UpdateProductService {


    async updateShowProduct(id){
        
        const result = await repo.updateShowProduct(id);

        return result;

    }
}

module.exports = new UpdateProductService();