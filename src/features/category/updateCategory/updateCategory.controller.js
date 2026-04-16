const service = require('./updateCategory.service');


class updateCategoryController{

    async updateCategory(req,res,next){
        try{

            const file = req.file;

            if(!file){
                throw new AppError('Please fill all the fields', 400);
            }

            const {id,name} = req.body;

            if(!id || !name){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.updateCategory(id,name,file);

            res.status(201).json({
                status: 'success',
                message: 'Category updated successfully',
                data: result
            });

        }catch(error){
            next(error);
        }
    }

}

module.exports = new updateCategoryController();