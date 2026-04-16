const service = require('./updateTags.service');


class updateTagController{

    async updateTag(req,res,next){
        try{

            const {id,name} = req.body;

            if(!id || !name){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.updateTag(id,name);

            res.status(201).json({
                status: 'success',
                message: 'Tag updated successfully',
                data: result
            });

        }catch(error){
            next(error);
        }
    }
}

module.exports = new updateTagController();