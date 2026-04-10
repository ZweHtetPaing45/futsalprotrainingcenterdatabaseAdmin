const service = require('./addProduct.service');

class AddProductController{


    async addProduct(req,res,next){

       try{

          const file = req.file;
          
         const {
            productName,brand,made,type,stock,description,
            category,cost,color,weight,rating,
            tags,price,size,warranty,date} = req.body;
          
            if(!productName || !brand || !made || !type || !stock || !description ||
                !category || !cost || !color || !weight || !rating || !file ||
                !tags || !price || !size || !warranty || !date)
            {

                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.addProduct(productName,brand,made,type,stock,description,
                category,cost,color,weight,rating,
                tags,price,size,warranty,date,file);

                if(!result)throw new AppError('Failed to add product',500);

                res.status(201).json({
                    status: 'success',
                    message: 'Product added successfully',
                    data: result
                });


       }catch(error){
        next(error);
       }
            
    }
}

module.exports = new AddProductController();