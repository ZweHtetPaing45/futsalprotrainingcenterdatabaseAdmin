const repo = require('./deleteProduct.repositories');



class deleteProductServices{

    async deleteProduct(id){

        const result = await repo.deleteProduct(id);

        return result;
    }
}

module.exports = new deleteProductServices();