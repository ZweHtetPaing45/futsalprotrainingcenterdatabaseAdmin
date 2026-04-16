const repo = require('./updateTags.repositories');


class updateTagsService {


    async updateTag(id,name){

        const result = await repo.updateTags(id,name);

        if(!result)throw new AppError('Failed to update tag',500);

        return result;
    }
}

module.exports = new updateTagsService();