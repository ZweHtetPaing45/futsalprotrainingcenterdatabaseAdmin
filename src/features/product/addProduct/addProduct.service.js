const repo = require('./addProduct.repositories');
const cloudinary = require('../../../config/cloudinary');

class AddProductService{

    async addProduct(productName,brand,made,type,stock,description,
                category,cost,color,weight,rating,
                tags,price,size,warranty,date,file)
        {

        const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

        if(!base64Image)throw new AppError('Please fill all the fields and Error is base64image', 400);


        const result = await cloudinary.uploader.upload(base64Image, {
            folder: 'products_images',
            });

        
        if(!result)throw new AppError('Cannot upload product',500);

        const imageUrl = result.secure_url;
        const publicId = result.public_id;


        const insertProduct = await repo.addingProduct(productName,brand,made,type,stock,description,
            category,cost,color,weight,rating,imageUrl,publicId,
            tags,price,size,warranty,date);

            return insertProduct;
        }

}

module.exports = new AddProductService();