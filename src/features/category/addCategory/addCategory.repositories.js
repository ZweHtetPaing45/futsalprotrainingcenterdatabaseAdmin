const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');

exports.addingcategory = async (name,imageUrl,publicUrl)=>{
    try{

        const insertCategory = await com.pool.query('insert into categories (name,image_url,public_url) values(?,?,?)',[name,imageUrl,publicUrl]);

        if(!insertCategory)throw new AppError('Failed to create category',500);

        if(insertCategory.affectedRows === 0)throw new AppError('Failed to create category',500);

        return true;

    }catch(error){

        logger.error({
            message: error.message,
            stack: error.stack
        });
        throw new AppError('Failed to create category',500);
    }
}