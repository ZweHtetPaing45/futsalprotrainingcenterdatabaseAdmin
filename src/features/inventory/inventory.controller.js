const service = require('./inventory.service');


class ControllerInventory{

    async showInventory(req,res,next){
        try{

            const result = await service.showInventory();

            if(!result) throw new AppError('Failed to show inventory',500);

            res.status(200).json({
                status: 'success',
                message: 'Inventory shown successfully',
                data: result
            });

        }catch(error){
            next(error);
        }
    }

    async deleteInventory(req,res,next){
        try{

            const id = req.params.id;

            if(!id) throw new AppError('Please provide inventory id',400);

            const result = await service.deleteProduct(id);

            // if(!result) throw new AppError('Failed to delete product',500);

            res.status(200).json({
                status: 'success',
                message: 'Product deleted successfully',
                data: result
            });

        }catch(error){
            next(error);
        }
    }

}

module.exports = new ControllerInventory();