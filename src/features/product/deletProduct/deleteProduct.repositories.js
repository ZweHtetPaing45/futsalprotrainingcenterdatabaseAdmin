const AppError = require("../../../utils/AppError");
const logger = require("../../../utils/logger");
const com = require('../../../config/com');
const uploader = require('@zwehtetpaing55/uploader');


exports.deleteProduct =async (id)=>{

    try{
        
        const showImage = await com.pool.query(`SELECT pi.public_id FROM products p LEFT JOIN product_images pi ON p.id = pi.product_id WHERE p.id = ?`,[id]);

        const public_id = showImage[0][0].public_id;

        const Deleteresult = await uploader.delete(public_id);

        if(!Deleteresult)throw new AppError('Failed to delete image',500);

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