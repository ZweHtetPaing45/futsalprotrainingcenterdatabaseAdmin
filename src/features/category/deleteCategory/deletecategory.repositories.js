const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


exports.deleteCategoryName = async (name,next)=>{
    try{

        const Catid = await com.pool.query('select id from categories where name = ?',[name]);

        if(Catid[0].length === 0)throw new AppError('Failed to delete category',404);

        const id = Catid[0][0].id;

        console.log(id);

         const Imageresult =await com.pool.query(`select public_url from categories where id = ?;`,[id]);

        // console.log("public_id",Imageresult[0][0].public_url);

        const public_id = Imageresult[0][0].public_url;

        const DeleteImage = await uploader.delete(public_id);

        if(!DeleteImage)throw new AppError('Failed to delete image',500);

        if(!Imageresult)throw new AppError('Failed to delete image',500);



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