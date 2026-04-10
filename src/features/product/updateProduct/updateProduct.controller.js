const AppError = require('../../../utils/AppError');
const service = require('./updateProduct.services');



//Helper မှာ data ကိုစုဆောင်း
const helper = require('./updateProduct.helper');




//
//Data ကိုထုတ် ထုတ်ပြီးသား data နဲ့ user ရိုက်ထည့်မဲ data ကို compare လုပ်ပြီးရင် စစ်ထုတ်မယ်
//



class UpdateProductController{


    async updateShowProduct(req,res,next){

        try{

            const id = req.params.id;

            if(!id || id === '')throw new AppError('Product id is required',400);

            const result = await service.updateShowProduct(id);

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

            console.log(file);

            const {
            productName,brand,made,type,stock,description,
            category,cost,color,weight,rating,
            tags,price,size,warranty,date} = req.body;

            const userinput = {
                productName,brand,made,type,stock,description,
                category,cost,color,weight,rating,
                tags,price,size,warranty,date,file
            }

            console.log(userinput);
            
        }catch(error){
            next(error);
        }
    }
}

module.exports = new UpdateProductController();