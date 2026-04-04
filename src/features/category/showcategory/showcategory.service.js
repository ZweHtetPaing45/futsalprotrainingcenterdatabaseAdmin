const AppError = require('../../../utils/AppError');
const repo = require('./showcategory.repositories');

class showcategoryService{

    async showcategory(){
        const result = await repo.showCategory();

        if(!result)throw new AppError('Failed to show category',500);

        return result;
    }
}

module.exports = new showcategoryService();