const AppError = require("../../../utils/AppError");
const logger = require("../../../utils/logger");
const service = require('./deletecategory.service');


class deleteCategoryController {


    async deleteName(req,res,next){
        try{
            const name = req.params.name;

            console.log(name);

            if(!name)throw new AppError('Please enter delete category name',400);

            const result = await service.deleteName(name);

            console.log(result);

            if(result){
                res.status(201).json({
                    status: 'success',
                    message: 'Delete Successful Categories',
                    data: result
                })
            }else{

                res.status(400).json({
                    status: 'failed',
                    message: 'Cannot delete category',
                    data: result
                })
            }

        }catch(error){
            next(error);
        }
    }
}

module.exports = new deleteCategoryController();