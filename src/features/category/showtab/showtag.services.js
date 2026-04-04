const AppError = require('../../../utils/AppError');
const repo = require('./showtag.repositories');

class showTagServices{

    async showTag(){
        const result = await repo.showTag();

        if(!result)throw new Error('Failed to show tags');

        return result;
    }
}

module.exports = new showTagServices();