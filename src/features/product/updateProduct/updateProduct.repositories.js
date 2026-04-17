const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const helper = require('./updateProduct.helper');
const uploader = require('@zwehtetpaing55/uploader');


exports.updateShowProduct = async (id)=>{

    try{

        let finalResult = [];

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


        finalResult.push(result[0]);

         const flat = finalResult.flat();

        // console.log('flat',flat);

        const unique = [];

        flat.forEach(item => {
        if (!unique.some(u => u.name === item.name)) {
            unique.push(item);
        }
        });

        return unique;

    }catch(error){
        logger.error({
            message: error.message,
            stack: error.stack
        });
        throw new AppError('Failed to update product', 500);
    }

}


exports.updateProduct = async(finalData)=>{

        let bid;

        console.log(finalData);

        const [result] = await com.pool.query('select id from brands where name = ?',[finalData.brand]);

        if(result.length > 0){
            
            bid = result[0].id;

        }else{

            const [createbid] = await com.pool.query('insert into brands (name) values (?)',[finalData.brand]);

            bid = createbid.insertId;
        }

        // console.log('bid',bid);

        const [resultCid] = await com.pool.query('select id from categories where name = ?',[finalData.category]);

        const cid = resultCid[0].id;

        // console.log('cid',cid);

        const [resultTid] = await com.pool.query('select id from tags where name = ?',[finalData.tags]);

        const tid = resultTid[0].id;

        // console.log('tagId',tid);

        const [updateProducts] = await com.pool.query(`
            update products set name = ?, price = ?, cost = ?, description = ?, warranty = ?, rating = ?, made = ?, brand_id = ?, category_id = ? where id = ?
            `,[finalData.productName,finalData.price,finalData.cost,finalData.description,finalData.warranty,finalData.rating,finalData.made,bid,cid,finalData.id]);
        
        if(updateProducts.affectedRows === 0)throw new AppError('Failed to update product',404);

        // console.log("Update Products",updateProducts);

        if(finalData.file){

            const result = await uploader.upload(finalData.file,'products_images');

            const imageUrl = result.image_url;
            const publicId = result.public_id;

            const [selectPublicId] = await com.pool.query('select public_id from product_images where product_id = ?',[finalData.id])

            console.log('selectPublicId',selectPublicId[0].public_id);

            await uploader.delete(selectPublicId[0].public_id);

            const [updateProductImage] = await com.pool.query(`update product_images set image_url = ?, public_id = ? where product_id = ?`,[imageUrl,publicId,finalData.id]);

            if(updateProductImage.affectedRows === 0)throw new AppError('Failed to update product',404);

        }
       
        const [updateProductVariant] = await com.pool.query(`
            update product_variants set type = ?, color = ?, size = ?, weight = ?, stock = ?, date = ? where product_id = ?
            `,[finalData.type,finalData.color,finalData.size,finalData.weight,finalData.stock,finalData.date,finalData.id]);

        if(updateProductVariant.affectedRows === 0)throw new AppError('Failed to update product',404);
        // console.log('Update Product Variant',updateProductVariant);

        //can not use update so insert product_tags

        const [findProductTag] = await com.pool.query('select tag_id from product_tags where product_id = ?',[finalData.id]);

        if(findProductTag.length > 0){
            const [updateProductTag] = await com.pool.query(`
            update product_tags set tag_id = ? where product_id = ?
            `,[tid,finalData.id]);

            if(updateProductTag.affectedRows === 0)throw new AppError('Failed to update product',404);
        }else{
            const [updateProductTag] = await com.pool.query(`
            insert into product_tags (product_id,tag_id) values (?,?)
            `,[finalData.id,tid]);
            if(updateProductTag.affectedRows === 0)throw new AppError('Failed to update product',404);
        }

        // if(updateProductTag.affectedRows === 0)throw new AppError('Failed to update product',404);
        
        return true;

}