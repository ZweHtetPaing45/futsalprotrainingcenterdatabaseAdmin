const AppError = require('../../../utils/AppError');
const repo = require('./updateProduct.repositories');
const cloudinary = require('../../../config/cloudinary');
const logger = require('../../../utils/logger');


class UpdateProductService {


    async updateShowProduct(id){
        
        const result = await repo.updateShowProduct(id);

        return result;

    }

    async deleteImage(public_id){

        console.log('public_id',public_id);

        if(!public_id)throw new AppError('Public id is required',400);

        const result = await cloudinary.uploader.destroy(public_id);

        if(!result)throw new AppError('Fail delete image',500);

        logger.info('delete image successful');

    }


    async updateProduct(finalData,inputData){

        const result = await repo.updateProduct(finalData);

        return result;

    }
}

module.exports = new UpdateProductService();