const repo = require('./addCategory.repositories');
const cloudinary = require('../../../config/cloudinary');
const sharp = require('sharp');
const AppError = require('../../../utils/AppError');
const uploader = require('@zwehtetpaing55/uploader');

class addCategoryServices {


    async addCategory(name,file){

        // let buffer = file.buffer;

        // console.log("buffer ",buffer);

        // const sizeMB = file.size / 1024 /1024;

        // console.log('sizeMB ',sizeMB);

        // if(file.mimetype === 'image/png'){
        //     buffer = await sharp(buffer).png({quality: 70}).toBuffer();
        // }else{
        //     if(sizeMB >= 5){
        //         buffer = await sharp(buffer).jpeg({quality: 50}).toBuffer();
        //     }else if(sizeMB > 2){
        //         buffer = await sharp(buffer).jpeg({quality: 60}).toBuffer();
        //     }else if(sizeMB > 1){
        //         buffer = await sharp(buffer).jpeg({quality: 70}).toBuffer();
        //     }
        // }

        // // let result;

        // try{

        //      result = await new Promise((resolve,reject)=>{

        //         const stream = cloudinary.uploader.upload_stream({
        //             folder: 'category_images',
        //             resource_type: 'image',
        //         },(error,result)=>{
        //             if(error) return reject(error);
        //             resolve(result);
        //         }
        //     );

        //     stream.end(buffer);

        //         });
        
        // }catch(error){
        //     throw new AppError("image upload failed",500);
        // }

        const result = await uploader.upload(file,'category_images');
        
        const imageUrl = result.image_url;
        console.log('imageUrl',imageUrl);
        const publicId = result.public_id;
        console.log('publicId',publicId);

        const resultcategory = await repo.addingcategory(name,imageUrl,publicId);

        return resultcategory;

    }
}

module.exports = new addCategoryServices();