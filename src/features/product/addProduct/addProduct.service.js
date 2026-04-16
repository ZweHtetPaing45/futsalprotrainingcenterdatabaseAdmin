const sharp = require('sharp');
const repo = require('./addProduct.repositories');
const cloudinary = require('../../../config/cloudinary');
const AppError = require('../../../utils/AppError');
const uploader = require('@zwehtetpaing55/uploader');


class AddProductService{


    async addProduct(productName,brand,made,type,stock,description,
                category,cost,color,weight,rating,
                tags,price,size,warranty,date,file)
        {

            

        // let buffer = file.buffer;

        // const sizeMB = file.size / 1024 /1024;

        // if(file.mimetype === 'image/png'){
        //         buffer = await sharp(buffer).png({quality: 70}).toBuffer();
        // }else{
        //      if(sizeMB >=5){
        //         buffer = await sharp(buffer).jpeg({quality: 50}).toBuffer();
        // }else if(sizeMB > 2){
        //         buffer = await sharp(buffer).jpeg({quality: 60}).toBuffer();
        // }else if(sizeMB > 1){
        //         buffer = await sharp(buffer).jpeg({quality: 70}).toBuffer();
        // }
        // }
       

        // console.log('Processed: ',buffer.length / 1024 / 1024 ," MB");

        // let result;
    
        // try{
        //      result = await new Promise((resolve, reject)=>{
        //     const stream = cloudinary.uploader.upload_stream({
        //         folder: 'products_images',
        //         resource_type: "image",
        //     },
        //     (error,result)=>{
        //         if(error)return reject(error);
        //         resolve(result);
        //     }
        // );
        // stream.end(buffer);
        // })
        
        // // if(!result)throw new AppError('Cannot upload product',500);

        // }catch(error){
        //     throw new AppError('Cannot upload product',500);
        // }

        // const imageUrl = result.secure_url;
        // const publicId = result.public_id;

        // console.log(imageUrl);
        // console.log(publicId);


        // const result = await uploader.upload(file,'products_images');

        // const imageUrl = result.image_url;
        // console.log('imageUrl',imageUrl);
        // const publicId = result.public_id;
        // console.log('publicId',publicId);

        const insertProduct = await repo.addingProduct(productName,brand,made,type,stock,description,
            category,cost,color,weight,rating,file,
            tags,price,size,warranty,date);

            return insertProduct;
        }

}

module.exports = new AddProductService();