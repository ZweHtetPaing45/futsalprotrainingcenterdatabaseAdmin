const AppError = require('../../../utils/AppError');
const repo = require('./deletetags.repositories');


class deleteTagServices{

    async deleteTags(name){

        const result = await repo.deleteTagName(name);

        if(!result)throw new AppError('Failed to delete tag',500);

        return result;
        
    }

}

module.exports = new deleteTagServices();