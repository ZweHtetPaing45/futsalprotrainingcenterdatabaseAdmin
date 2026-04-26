const repo = require('./generalSetting.repositories');


class GeneralSettingService {

    async addgeneralSetting(shop_name,contact_info,address,social_link,file){

        const result = await repo.addgeneralSetting(shop_name,contact_info,address,social_link,file);

        return result;

    }

    async showgeneralSetting(){


        const result = await repo.showgeneralSetting();

        return result;
    }

    async updategeneralSetting(id,shop_name,contact_info,address,social_link,file){
        
        const result = await repo.updategeneralSetting(id,shop_name,contact_info,address,social_link,file);

        return result;
    }
}

module.exports = new GeneralSettingService();