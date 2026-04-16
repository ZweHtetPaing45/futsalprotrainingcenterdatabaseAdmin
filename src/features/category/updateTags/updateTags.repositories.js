const AppError = require("../../../utils/AppError");
const logger = require("../../../utils/logger");
const com  = require('../../../config/com');


exports.updateTags = async (id,name)=>{
    

    const [findName] = await com.pool.query('select id from tags where name = ?',[name]);

    if(findName.length > 0){
        throw new AppError("Tag same name already exist !",400);
    }

    const result = await com.pool.query('update tags set name = ? where id = ?',[name,id]);

    if(result.affectedRows === 0)throw new AppError('Failed to update tag',404);

    return true;

}