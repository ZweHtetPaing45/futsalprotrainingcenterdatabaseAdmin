const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


exports.addingcategory = async (name,file)=>{
 

        const [findName] = await com.pool.query('select name from categories where name = ?',[name]);

        // console.log(findName[0][0].name);

        if(findName.length > 0){
            throw new AppError("Category same name already exist !",400);
        }
    
        const result = await uploader.upload(file,'category_images');
    
        const imageUrl = result.image_url;
        console.log('imageUrl',imageUrl);
        const publicUrl = result.public_id;
        console.log('publicId',publicUrl);

        console.log(name);

        const insertCategory = await com.pool.query('insert into categories (name,image_url,public_url) values(?,?,?)',[name,imageUrl,publicUrl]);

        if(!insertCategory)throw new AppError("Category same name already exist !",400);

        if(insertCategory.affectedRows === 0)throw new AppError('Failed to create category',500);

        return true;

    
}