const logger = require("../../../utils/logger");
const com = require('../../../config/com');
const AppError = require("../../../utils/AppError");


exports.showTag = async ()=>{
    try{

        const result = await com.pool.query('select name from tags');

        if(!result)throw new AppError('Failed to show tags',500);

        return result[0];

    }catch(error){
        logger.error({
            error: error.message,
            stack: error.stack
        });
        throw new AppError('Failed to show tags',500);
    }
}