const service = require('./searchProducts.services');


class searchProductController{

    async searchProduct(req,res,next){
        try{

            const name = req.params.name;

            const result = await service.searchProduct(name);

            if(result.length > 0){
                res.status(201).json({
                    status: 'success',
                    message: 'List',
                    data: result
                }) 
            }else{
                res.status(400).json({
                    status: 'failed',
                    message: 'Cannot found product',
                    data: result
                })
            }

            // if(result){
            //     res.status(201).json({
            //         status: 'success',
            //         message: 'List',
            //         data: result
            //     })
            // }else{
            //     res.status(400).json({
            //         status: 'failed',
            //         message: 'Cannot found product',
            //         data: result
            //     })
            // }

        }catch(error){
            next(error);
        }
    }
}

module.exports = new searchProductController();