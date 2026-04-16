const AppError = require('../../../utils/AppError');
const repo = require('./updateCategory.repositories');

class updateCategoryService{


    async updateCategory(id,name,file){

        const result = await repo.updateCategory(id,name,file);

        if(!result)throw new AppError('Failed to update category',500);

        return result;
    }

}

module.exports = new updateCategoryService();