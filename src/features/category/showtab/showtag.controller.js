const service = require('./showtag.services');

class showTagController{

    async showTag(req,res,next){
        try{

            const result = await service.showTag();

            if(!result)throw new AppError('Failed to show tags',500);   
        
            res.status(200).json({
                status: 'success',
                message: 'Tags shown successfully',
                data: result
            });

        }catch(error){
            next(error);
        }
    }

}

module.exports = new showTagController();