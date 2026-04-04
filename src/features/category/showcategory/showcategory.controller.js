const service = require('./showcategory.service');

class showCategory{
    
    async showCategory(req,res,next){
        try{

            const result = await service.showcategory();

            res.status(200).json({
                status: 'success',
                message: 'Category shown successfully',
                data: result
            });
            
        }catch(error){

        }
    }
}

module.exports = new showCategory();