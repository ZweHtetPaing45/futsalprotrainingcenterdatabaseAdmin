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
    p.name AS productName,
    p.price,
    p.cost,
    p.description,
    p.warranty,
    p.rating,
    p.made,

    b.name AS brand,
    c.name AS category,

    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

    GROUP_CONCAT(DISTINCT pv.type) AS types,
    GROUP_CONCAT(DISTINCT pv.color) AS colors,
    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

    COALESCE(SUM(pv.stock),0) AS total_stock,

    CASE 
        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
        ELSE 'Out of Stock'
    END AS status,

    GROUP_CONCAT(DISTINCT t.name) AS tags

FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_variants pv ON p.id = pv.product_id
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id

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