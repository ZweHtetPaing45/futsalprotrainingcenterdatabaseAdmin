const repo = require('./addCategory.repositories');
const cloudinary = require('../../../config/cloudinary')

class addCategoryServices {


    async addCategory(name,file){

        const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(base64Image, {
            folder: 'category_images',
            });
        
        const imageUrl = result.secure_url;
        const publicId = result.public_id;


        const resultcategory = await repo.addingcategory(name,imageUrl,publicId);

        return resultcategory;

    }
}

module.exports = new addCategoryServices();