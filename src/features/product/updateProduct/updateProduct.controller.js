const AppError = require('../../../utils/AppError');
const service = require('./updateProduct.services');
const sharp = require('sharp');
const cloudinary = require('../../../config/cloudinary');
const uploader = require('@zwehtetpaing55/uploader');

//Helper မှာ data ကိုစုဆောင်း
const helper = require('./updateProduct.helper');


//checking 
const compare = require('./updateProduct.compare');




//
//Data ကိုထုတ် ထုတ်ပြီးသား data နဲ့ user ရိုက်ထည့်မဲ data ကို compare လုပ်ပြီးရင် စစ်ထုတ်မယ်
//



class UpdateProductController{


    // async updateShowProduct(req,res,next){

    //     try{

    //         const id = req.params.id;

    //         if(!id || id === '')throw new AppError('Product id is required',400);

    //         const result = await service.updateShowProduct(id);

    //         // await helper.updateProductData(result);

    //         if(result){
    //             res.status(201).json({
    //                 status: 'success',
    //                 message: 'Update Successful Product',
    //                 data: result
    //             })
    //         }else{
    //             res.status(400).json({
    //                 status: 'failed',
    //                 message: 'Cannot update product',
    //                 data: result
    //             })
    //         }

    //     }catch(error){
    //         next(error);
    //     }

    // }

    async updateProduct(req,res,next){
        try{

            const file = req.file;
           
            
             const {
            id,
            productName,brand,made,type,stock,description,
            category,cost,color,weight,rating,
            tags,price,size,warranty,date} = req.body;

            // if(!productName || !brand || !made || !type || !stock || !description ||
            //     !category || !cost || !color || !weight || !rating ||
            //     !tags || !price || !size || !warranty || !date)
            // {

            //     throw new AppError('Please fill all the fields', 400);
            // }

            const userinput = {
                id,
                productName,brand,made,type,stock,description,
                category,cost,color,weight,rating,
                tags,price,size,warranty,date,file
            }
            
            // const insertresult = await helper.insertData();

            // const finalData = await compare.mergeProductData(userinput);

            

            // console.log('Helper Result ',insertresult);

            // console.log("userInput Data : ",userinput);

            // console.log('Final Data',finalData);

            const result = await service.updateProduct(userinput);

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