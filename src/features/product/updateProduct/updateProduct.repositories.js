const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const helper = require('./updateProduct.helper');


exports.updateShowProduct = async (id)=>{

    try{

        const result = await com.pool.query(`SELECT 
                    p.id,
                    p.name AS productName,
                    p.price,
                    p.cost,
                    p.description,
                    p.warranty,
                    p.rating,
                    p.made,

                    b.name AS brand,
                    c.name AS category,

                    pi.image_url,
                    pi.public_id,

                    pv.type,
                    pv.color,
                    pv.size,
                    pv.weight,
                    pv.stock,
                    pv.date,

                    t.name AS tag

                FROM products p
                LEFT JOIN brands b ON p.brand_id = b.id
                LEFT JOIN categories c ON p.category_id = c.id
                LEFT JOIN product_images pi ON p.id = pi.product_id
                LEFT JOIN product_variants pv ON p.id = pv.product_id
                LEFT JOIN product_tags pt ON p.id = pt.product_id
                LEFT JOIN tags t ON pt.tag_id = t.id

                WHERE p.id = ?`,[id]);

        if(result.affectedRows === 0)throw new AppError('Failed to update product',404);

        helper.updateProductData(result[0]);


        return result[0];

    }catch(error){
        logger.error({
            message: error.message,
            stack: error.stack
        });
        throw new AppError('Failed to update product', 500);
    }

}