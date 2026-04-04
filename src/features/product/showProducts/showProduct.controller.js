const service = require('./showProduct.services');

class showProductController{

    async showProduct(req,res,next){
        try{

            const result = await service.showProduct();

            res.status(200).json({
                status: 'success',
                message: 'Products shown successfully',
                data: result
            });

        }catch(error){
            next(error);
        }
    }
}

module.exports = new showProductController();