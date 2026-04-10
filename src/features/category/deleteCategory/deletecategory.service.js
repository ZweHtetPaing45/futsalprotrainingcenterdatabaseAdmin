const AppError = require("../../../utils/AppError");
const repo = require('./deletecategory.repositories');


class deleteCategoryService{


    async deleteName(name){

        const result = await repo.deleteCategoryName(name);

        if(!result)throw new AppError('Failed to delete category',500);

        return result;

    }
}

module.exports = new deleteCategoryService();