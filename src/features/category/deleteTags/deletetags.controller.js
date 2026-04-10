const AppError = require("../../../utils/AppError");
const service = require('./deletetags.service');

class deleteTagController{

    async deleteName(req,res,next){
        try{
            
            const name = req.params.name;

            console.log(name);

            if(!name)throw new AppError('Please enter delete tag name', 400);

            const result = await service.deleteTags(name);
            
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

module.exports = new deleteTagController();