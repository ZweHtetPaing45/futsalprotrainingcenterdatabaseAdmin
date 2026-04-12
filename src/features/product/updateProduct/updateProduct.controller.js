const AppError = require('../../../utils/AppError');
const service = require('./updateProduct.services');
const sharp = require('sharp');
const cloudinary = require('../../../config/cloudinary');

//Helper မှာ data ကိုစုဆောင်း
const helper = require('./updateProduct.helper');


//checking 
const compare = require('./updateProduct.compare');




//
//Data ကိုထုတ် ထုတ်ပြီးသား data နဲ့ user ရိုက်ထည့်မဲ data ကို compare လုပ်ပြီးရင် စစ်ထုတ်မယ်
//



class UpdateProductController{


    async updateShowProduct(req,res,next){

        try{

            const id = req.params.id;

            if(!id || id === '')throw new AppError('Product id is required',400);

            const result = await service.updateShowProduct(id);

            // await helper.updateProductData(result);

            if(result){
                res.status(201).json({
                    status: 'success',
                    message: 'Update Successful Product',
                    data: result
                })
            }else{
                res.status(400).json({
                    status: 'failed',
                    message: 'Cannot update product',
                    data: result
                })
            }

        }catch(error){
            next(error);
        }

    }

    async updateProduct(req,res,next){
        try{

            const file = req.file;

            let imageUrl;
            let publicId;
            

            if(file){
                
             let buffer = file.buffer;

        const sizeMB = file.size / 1024 /1024;

        if(file.mimetype === 'image/png'){
                buffer = await sharp(buffer).png({quality: 70}).toBuffer();
        }else{
             if(sizeMB >=5){
                buffer = await sharp(buffer).jpeg({quality: 50}).toBuffer();
        }else if(sizeMB > 2){
                buffer = await sharp(buffer).jpeg({quality: 60}).toBuffer();
        }else if(sizeMB > 1){
                buffer = await sharp(buffer).jpeg({quality: 70}).toBuffer();
        }
        }
       

        console.log('Processed: ',buffer.length / 1024 / 1024 ," MB");

        let result;
    
        try{
             result = await new Promise((resolve, reject)=>{
            const stream = cloudinary.uploader.upload_stream({
                folder: 'products_images',
                resource_type: "image",
            },
            (error,result)=>{
                if(error)return reject(error);
                resolve(result);
            }
        );
        stream.end(buffer);
        })
        
        // if(!result)throw new AppError('Cannot upload product',500);

        }catch(error){
            throw new AppError('Cannot upload product',500);
        }

        imageUrl = result.secure_url;
        publicId = result.public_id;

        console.log(imageUrl);
        console.log(publicId);

            }else{
                
            imageUrl = "";
            publicId = "";

            }
            // console.log(file);

            const {
            productName,brand,made,type,stock,description,
            category,cost,color,weight,rating,
            tags,price,size,warranty,date} = req.body;

            const userinput = {
                productName,brand,made,type,stock,description,
                category,cost,color,weight,rating,
                tags,price,size,warranty,date,imageUrl,publicId
            }
            
            const insertresult = await helper.insertData();

            const finalData = await compare.mergeProductData(insertresult,userinput);

            

            // console.log('Helper Result ',insertresult);

            // console.log("userInput Data : ",userinput);

            // console.log('Final Data',finalData);

            const result = await service.updateProduct(finalData);

             res.status(201).json({
                    status: 'success',
                    message: 'Update Successful Product',
                    data: result
                })
            
        }catch(error){
            next(error);
        }
    }
}

module.exports = new UpdateProductController();