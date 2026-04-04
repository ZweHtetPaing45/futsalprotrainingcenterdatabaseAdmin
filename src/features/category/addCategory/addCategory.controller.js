const AppError = require("../../../utils/AppError");
const service = require('./addCategory.services');


class AddCategoryController{

    async addCategory(req,res,next){
        try{
            const {name} = req.body;
            const file = req.file;

            if(!name || !file){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.addCategory(name,file);

            res.status(201).json({
                status: 'success',
                message: 'Category added successfully',
                data: result
            });


        }catch(error){
            next(error);
        }
    }

}

module.exports = new AddCategoryController();