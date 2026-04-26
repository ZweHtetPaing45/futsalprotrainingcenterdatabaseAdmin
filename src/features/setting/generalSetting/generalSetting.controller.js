const service = require('./generalSetting.service');


class GeneralSettingController {


    async addgeneralSetting(req,res,next){

        try{

            const file = req.file;

            if(!file) throw new AppError('Image file is required',400);

            const {shop_name,contact_info,address,social_link} = req.body;

            if(!shop_name || !contact_info || !address || !social_link){
                return res.status(400).json({message:"All fields are required"});
            }

            const result = await service.addgeneralSetting(shop_name,contact_info,address,social_link,file);

            if(!result) throw new AppError('Failed to add general setting',500);

            res.status(200).json({
                status: 'success',
                message: 'General setting added successfully'
            });

        }catch(error){
            next(error);
        }

    }

    async showgeneralSetting(req,res,next){
        try{

            const result = await service.showgeneralSetting();

            if(!result) throw new AppError('Failed to show general setting',500);

            res.status(200).json({
                status: 'success',
                data: result
            });

        }catch(error){
            next(error);
        }
    }

    async updategeneralSetting(req,res,next){
        try{

            const file = req.file;

            const {id,shop_name,contact_info,address,social_link} = req.body;

            if(!id) return res.status(400).json({message:"ID is required"});

            const result = await service.updategeneralSetting(id,shop_name,contact_info,address,social_link,file);

            if(!result) throw new AppError('Failed to update general setting',500);

            res.status(200).json({
                status: 'success',
                message: 'General setting updated successfully'
            });

        }catch(error){
            next(error);
        }
    }

}

module.exports = new GeneralSettingController();