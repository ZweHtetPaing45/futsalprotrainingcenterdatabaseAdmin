const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');

exports.deleteTagName = async (name)=>{

   try{
        const TagId = await com.pool.query('select id from tags where name = ?',[name]);

        if(TagId[0].length === 0)throw new AppError('Failed to delete tag',404);

        const id = TagId[0][0].id;

        const result = await com.pool.query('delete from tags where id = ?',[id]);

        if(result.affectedRows === 0)throw new AppError('Failed to delete tag',404);

        return true;

   }catch(error){
    
        logger.error({
            message: error.message,
            stack: error.stack
        });
        throw new AppError('Failed to delete tag',500);
   }
}