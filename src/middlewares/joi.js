const joi = require('joi');
const AppError = require('../utils/AppError');


const createProduct = joi.object({
    productName: joi.string().min(1).max(100).required(),
    brand: joi.string().min(1).max(100).required(),
    made: joi.string().min(1).max(100).required(),
    type: joi.string().min(1).max(100).required(),
    stock: joi.string().min(0).max(1000000000).required(),
    description: joi.string().min(1).max(500).required(),
    category: joi.string().min(1).max(100).required(),
    cost: joi.string().min(1).max(100).required(),
    color: joi.string().min(2).max(100).required(),
    weight: joi.string().min(0).max(100).required(),
    rating: joi.string().min(0).max(5).required(),
    uploadImage: joi.string().min(1).max(100).required(),
    tags: joi.string().min(1).max(100).required(),
    price: joi.string().min(1).max(100).required(),
    size: joi.string().min(1).max(100).required(),
    // speed: joi.string().min(1).max(100).required(),
    warranty: joi.string().min(1).max(100).required(),
    date: joi.string().min(1).max(100).required(),
});

const addCategories = joi.object({
    name: joi.string().min(1).max(100).required(),
});

const addTag = joi.object({
    name: joi.string().min(1).max(100).required(),
});

const deleteCategory = joi.object({
    name: joi.string().min(1).max(100).required().trim(),
});

const deleteTag = joi.object({
    name: joi.string().min(1).max(100).required().trim()
});

const deleteProduct = joi.object({
    name: joi.string().min(1).required().trim()
});

const searchProduct = joi.object({
    name: joi.string().min(1).max(100).required().trim()
});


const updateOrder = joi.object({
    action: joi.string().min(1).max(100).required().trim()
});

// productName: joi.string().min(1).max(100).required(),
//     brand: joi.string().min(1).max(100).required(),
//     made: joi.string().min(1).max(100).required(),
//     type: joi.string().min(1).max(100).required(),
//     stock: joi.integer().min(0).max(100).required(),
//     description: joi.string().min(1).max(500).require(),
//     category: joi.string().min(1).max(100).required(),
//     cost: joi.integer().min(1).max(100).required(),
//     color: joi.string().min(2).max(100).required(),
//     weight: joi.integer().min(0).max(100).required(),
//     rating: joi.integer().min(0).max(5).required(),
//     uploadImage: joi.string().min(1).max(100).required(),
//     tags: joi.string().min(1).max(100).required(),
//     price: joi.integer().min(1).max(100).required(),
//     size: joi.string().min(1).max(100).required(),
//     speed: joi.string().min(1).max(100).required(),
//     warranty: joi.string().min(1).max(100).required(),
//     date: joi.string().min(1).max(100).required(),

const validate = (schema)=>{
    return (req,res,next)=>{
        const {error,value} = schema.validate(req.body);

        if(error){
            throw new AppError(error.detail[0].message, 400);
        }

        req.body = value;
        next();
    }
}


module.exports = {
    deleteProduct,
    searchProduct,
    deleteTag,
    deleteCategory,
    addTag,
    addCategories,
    createProduct,
    updateOrder,
    validate
}

// const {productName,brand,made,type,stock,description,
//             category,cost,color,weight,rating,uploadImage,
//             tags,price,size,speed,warranty,date} = req.body;
