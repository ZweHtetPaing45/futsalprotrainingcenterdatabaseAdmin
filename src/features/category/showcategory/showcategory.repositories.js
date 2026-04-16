const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');

exports.showCategory = async ()=>{
    try{
        const result = await com.pool.query('select id,name,image_url,public_url from categories');
        
        return result[0];

    }catch(error){
        logger.error({
            error: error.message,
            stack: error.stack
        })
    }
}