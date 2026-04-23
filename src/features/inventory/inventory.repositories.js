const AppError = require("../../utils/AppError");
const logger = require("../../utils/logger");
const com = require('../../config/com');



exports.showinventory = async()=>{
    
    const result = await com.pool.query(`
                        SELECT 
                        p.id AS ProductID,
                        p.name AS productName,
                        p.price,
                        p.cost,
                        p.description,
                        p.warranty,
                        p.rating,
                        p.made,
                        date_format(p.created_at, '%Y-%m-%d') AS Date,
                        b.name AS brand,
                        c.name AS category,

                        GROUP_CONCAT(DISTINCT pi.image_url) AS images,
                        GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

                        GROUP_CONCAT(DISTINCT pv.type) AS types,
                        GROUP_CONCAT(DISTINCT pv.color) AS colors,
                        GROUP_CONCAT(DISTINCT pv.size) AS sizes,
                        GROUP_CONCAT(DISTINCT pv.weight) AS weights,

                        COALESCE(SUM(pv.stock),0) AS current_stock,

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

        if(!result)throw new AppError('Failed to show inventory',500);

        return result[0];

}

exports.deleteProduct = async (id)=>{
    
    try{
        const result = await com.pool.query('delete from products where id = ?',[id]);

        // console.log(result);

        // console.log(status.result);

        if(result.affectedRows === 0)throw new AppError('Failed to delete product',404);

        return true;

    }catch(error){
        if(error.code === 'ER_ROW_IS_REFERENCED_2'){
            return 'Cannot delete product because it is used in order_items table and orders table';
        }
        throw new AppError('Failed to delete product',500);
    }
}