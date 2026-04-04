const AppError = require("../../../utils/AppError");
const com = require('../../../config/com');
const logger = require("../../../utils/logger");


exports.addingTag = async (name)=>{
    try{
        const insertTag = await com.pool.query('insert into tags (name) values (?)',[name]);

        if(!insertTag)throw new AppError('Failed to create tag',500);

        return true;
    }catch(error){
        logger.error({
            message: error.message,
            stack: error.stack
        });
        throw new AppError('Failed to create tag',500);
    }
}