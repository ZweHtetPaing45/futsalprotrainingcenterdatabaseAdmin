const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');


exports.deleteCategoryName = async (name,next)=>{
    try{

        const Catid = await com.pool.query('select id from categories where name = ?',[name]);

        if(Catid[0].length === 0)throw new AppError('Failed to delete category',404);

        const id = Catid[0][0].id;

        console.log(id);

        const result = await com.pool.query('delete from categories where id = ?',[id]);

        if(result.affectedRows === 0)throw new AppError('Failed to delete category',404);

        // console.log(result);
        return true;

    }catch(error){
        logger.error({
            message: error.message,
            stack: error.stack
        }),
        AppError('Failed to delete category',500);
    }
}