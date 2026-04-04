const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');


//display the stock number

// SELECT 
//     p.id,
//     p.name,
//     p.price,
//     GROUP_CONCAT(DISTINCT pi.image_url) AS images,
//     CASE 
//         WHEN SUM(pv.stock) > 0 THEN 'isAvailable'
//         ELSE 'Out of Stock'
//     END AS status
// FROM products p
// LEFT JOIN product_images pi 
//     ON p.id = pi.product_id
// LEFT JOIN product_variants pv
//     ON p.id = pv.product_id
// GROUP BY p.id;

// SELECT 
//     p.id,
//     p.name,
//     p.price,
//     GROUP_CONCAT(DISTINCT pi.image_url) AS images,
//     SUM(pv.stock) AS total_stock,
//     CASE 
//         WHEN SUM(pv.stock) > 0 THEN 'isAvailable'
//         ELSE 'Out of Stock'
//     END AS status
// FROM products p
// LEFT JOIN product_images pi 
//     ON p.id = pi.product_id
// LEFT JOIN product_variants pv
//     ON p.id = pv.product_id
// GROUP BY p.id;

exports.showProducts = async ()=>{
    try{

        const result = await com.pool.query(`SELECT 
    p.id,
    p.name,
    p.price,
    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
    SUM(pv.stock) AS total_stock,
    CASE 
        WHEN SUM(pv.stock) > 0 THEN 'isAvailable'
        ELSE 'Out of Stock'
    END AS status
FROM products p
LEFT JOIN product_images pi 
    ON p.id = pi.product_id
LEFT JOIN product_variants pv
    ON p.id = pv.product_id
GROUP BY p.id;`);

        return result[0];

    }catch(error){
        logger.error({
            message: error.message,
            stack: error.stack
        });
        throw new AppError('Failed to show products',500);
    }
}