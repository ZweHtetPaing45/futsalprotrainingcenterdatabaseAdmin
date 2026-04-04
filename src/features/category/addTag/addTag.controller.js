const service = require('./addTag.service');

class addTagController{

    async addTag(req,res,next){
        try{
            
            const {name} = req.body;

            if(!name){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.addTag(name);

               res.status(201).json({
                status: 'success',
                message: 'Tagging added successfully',
                data: result
            });

            
        }catch(error){
            next(error);
        }
    }
}

module.exports = new addTagController();