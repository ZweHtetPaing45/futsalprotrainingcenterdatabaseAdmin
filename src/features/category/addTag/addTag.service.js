const repo = require('./addTag.repositories');

class addTagService {


    async addTag(name){

        const resultTag = await repo.addingTag(name);

        return resultTag;
    }
}

module.exports = new addTagService();