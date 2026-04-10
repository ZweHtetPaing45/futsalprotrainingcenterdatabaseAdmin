const AppError = require("../../../utils/AppError");
const logger = require("../../../utils/logger");
const com = require('../../../config/com');


exports.deleteProduct =async (id)=>{

    try{

        const result = await com.pool.query('delete from products where id = ?',[id]);

        if(result.affectedRows === 0)throw new AppError('Failed to delete product',404);

        return true;

    }catch(error){
        logger.error({
            message: error.message,
            stack: error.stack
        });
    throw new AppError('Failed to delete product',500);
    }

}