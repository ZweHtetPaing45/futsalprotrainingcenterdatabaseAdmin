const service = require('./deleteProduct.services');


class deleteProductController{

    async deleteProduct(req,res,next){
        try{

            const id = req.params.id;

            const result = await service.deleteProduct(id);

            if(result){
                res.status(201).json({
                    status: 'success',
                    message: 'Delete Successful Product',
                    data: result
                })
            }else{
                res.status(400).json({
                    status: 'failed',
                    message: 'Cannot delete product',
                    data: result
                })
            }

        }catch(error){
            next(error);
        }
    }
}

module.exports = new deleteProductController();