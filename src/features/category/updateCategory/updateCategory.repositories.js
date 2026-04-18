const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


exports.updateCategory = async (id,name,file)=>{


    //Name မှာ data မပါဘဲ image data ပါရင်

        if((file !== null || file !== undefined) && (name === '' || name === null || name === undefined)){

        const [seletepublicId] = await com.pool.query('select public_url from categories where id = ?',[id]);

        let imageUrl;
        let publicUrl;

        if(seletepublicId.length > 0){

            const deleteImage = await uploader.delete(seletepublicId[0].public_url);

            if(!deleteImage)throw new AppError('Failed to delete image',500);

            const result = await uploader.upload(file,'category_images');
                
            imageUrl = result.image_url;
            publicUrl = result.public_id;

        }

        const [result] = await com.pool.query('update categories set image_url = ?,public_url = ? where id = ?',[imageUrl,publicUrl,id]);

        if(result.affectedRows === 0)throw new AppError('Failed to update category',500);


        return true;

        }

      

        //Name ပါပြီး image မပါရင်

        const [findName] = await com.pool.query('select id from categories where name = ?',[name]);


        if(findName.length > 0){
            throw new AppError("Category same name already exist !",400);
        }

        if(file === null || file === undefined){

        const [result] = await com.pool.query('update categories set name = ? where id = ?',[name,id]);

        if(result.affectedRows === 0)throw new AppError('Failed to update category',500);


        return true;

        }


        //နှစ်ခုလုံးပါရင်

        const [seletepublicId] = await com.pool.query('select public_url from categories where id = ?',[id]);

        let imageUrl;
        let publicUrl;

        if(seletepublicId.length > 0){

            const deleteImage = await uploader.delete(seletepublicId[0].public_url);

            if(!deleteImage)throw new AppError('Failed to delete image',500);

            const result = await uploader.upload(file,'category_images');
                
            imageUrl = result.image_url;
            publicUrl = result.public_id;

        }

        const [result] = await com.pool.query('update categories set name = ?,image_url = ?,public_url = ? where id = ?',[name,imageUrl,publicUrl,id]);

        if(result.affectedRows === 0)throw new AppError('Failed to update category',500);

        // console.log('Update Category',result);

        return true;

        // const [result] = await com.pool.query('update categories set name = ?,image_url = ?,public_url = ? where id = ?',[name,imageUrl,publicId,id]);

        // console.log('Update Category',result)

}