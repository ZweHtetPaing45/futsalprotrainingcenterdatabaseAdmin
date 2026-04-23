const repo = require('./inventory.repositories');

class ServiceInventory{

    async showInventory(){
        const result = await repo.showinventory();

        return result;
    }


    async deleteProduct(id){
        
        const result = await repo.deleteProduct(id);

        return result;

    }

}

module.exports = new ServiceInventory();