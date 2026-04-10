const AppError = require("../../../utils/AppError");
const logger = require("../../../utils/logger");
const com = require('../../../config/com');

exports.FirstsearchProduct = async (name)=>{
    try{

        //search name condition where category name, brand name , tag name and product name

        // console.log(name);

        const catId = await com.pool.query('select id from categories where name = ?',[name]);

        // const cid = catId[0][0].id;
        // console.log(cid);

        if(catId[0].length > 0){
            
        const cid = catId[0][0].id;
        logger.info(cid);

            const result =  await com.pool.query(`SELECT 
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

                    -- images
                    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
                    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

                    -- variants
                    GROUP_CONCAT(DISTINCT pv.type) AS types,
                    GROUP_CONCAT(DISTINCT pv.color) AS colors,
                    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
                    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

                    -- total stock
                    COALESCE(SUM(pv.stock),0) AS total_stock,

                    -- status
                    CASE 
                        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
                        ELSE 'out of stock'
                    END AS status,

                    -- tags
                    GROUP_CONCAT(DISTINCT t.name) AS tags

                FROM products p

                LEFT JOIN brands b ON p.brand_id = b.id
                LEFT JOIN categories c ON p.category_id = c.id
                LEFT JOIN product_images pi ON p.id = pi.product_id
                LEFT JOIN product_variants pv ON p.id = pv.product_id
                LEFT JOIN product_tags pt ON p.id = pt.product_id
                LEFT JOIN tags t ON pt.tag_id = t.id

                WHERE p.category_id = ?

                GROUP BY p.id`,[cid]);
            return result[0];
        }

        const tagId = await com.pool.query('select id from tags where name = ?',[name]);

        // const tid = tagId[0][0].id;
        // console.log(tid);

        if(tagId[0].length > 0){
            const tid = tagId[0][0].id;
        logger.info(tid);
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

    -- images
    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

    -- variants
    GROUP_CONCAT(DISTINCT pv.type) AS types,
    GROUP_CONCAT(DISTINCT pv.color) AS colors,
    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

    -- total stock
    COALESCE(SUM(pv.stock),0) AS total_stock,

    -- status
    CASE 
        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
        ELSE 'out of stock'
    END AS status,

    -- tags
    GROUP_CONCAT(DISTINCT t.name) AS tags

FROM products p

LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_variants pv ON p.id = pv.product_id
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id

-- 👉 CHANGE HERE (tag filter)
WHERE pt.tag_id = ?

GROUP BY p.id`,[tid]);

            return result[0];
        }

        const brandId = await com.pool.query('select id from brands where name = ?',[name]);

        // const bid = brandId[0][0].id;
        // console.log(bid);

        if(brandId[0].length > 0){
            
        const bid = brandId[0][0].id;
        logger.info(bid);
            const result =  await com.pool.query(`SELECT 
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

    -- images
    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

    -- variants
    GROUP_CONCAT(DISTINCT pv.type) AS types,
    GROUP_CONCAT(DISTINCT pv.color) AS colors,
    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

    -- total stock
    COALESCE(SUM(pv.stock),0) AS total_stock,

    -- status
    CASE 
        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
        ELSE 'out of stock'
    END AS status,

    -- tags
    GROUP_CONCAT(DISTINCT t.name) AS tags

FROM products p

LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_variants pv ON p.id = pv.product_id
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id

-- 👉 BRAND FILTER
WHERE p.brand_id = ?

GROUP BY p.id`,[bid]);
            return result[0];
        } 
            const result =  await com.pool.query(`SELECT 
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

                WHERE p.name = ?`,[name]);

            return result[0];

        

    }catch(error){
        logger.error({
            error: error.message,
            stack: error.stack
        })
        throw new AppError('Failed to search product',500);
    }
}


exports.SecondsearchProduct = async (name)=>{
    try{

        const splitName = name.split(' ');

        let finalResult = [];
        

        //အမည်တွေကို တစ်လုံးခြင်း Table တစ်ခုခြင်းရှိမှာ ရှိလားစစ်တာ

        for(let i = 0; i < splitName.length; i++){
            
            const catId = await com.pool.query('select id from categories where name = ?',[splitName[i]]);

        if(catId[0].length > 0){
            
            const cid = catId[0][0].id;
            logger.info(cid);

            const result =  await com.pool.query(`SELECT 
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

                    -- images
                    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
                    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

                    -- variants
                    GROUP_CONCAT(DISTINCT pv.type) AS types,
                    GROUP_CONCAT(DISTINCT pv.color) AS colors,
                    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
                    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

                    -- total stock
                    COALESCE(SUM(pv.stock),0) AS total_stock,

                    -- status
                    CASE 
                        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
                        ELSE 'out of stock'
                    END AS status,

                    -- tags
                    GROUP_CONCAT(DISTINCT t.name) AS tags

                FROM products p

                LEFT JOIN brands b ON p.brand_id = b.id
                LEFT JOIN categories c ON p.category_id = c.id
                LEFT JOIN product_images pi ON p.id = pi.product_id
                LEFT JOIN product_variants pv ON p.id = pv.product_id
                LEFT JOIN product_tags pt ON p.id = pt.product_id
                LEFT JOIN tags t ON pt.tag_id = t.id

                WHERE p.category_id = ?

                GROUP BY p.id`,[cid]);
                // return result[0];

            finalResult.push(result[0]);
        
        }

        const tagId = await com.pool.query('select id from tags where name = ?',[splitName[i]]);

        // const tid = tagId[0][0].id;
        // console.log(tid);

        if(tagId[0].length > 0){
            const tid = tagId[0][0].id;
        logger.info(tid);
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

    -- images
    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

    -- variants
    GROUP_CONCAT(DISTINCT pv.type) AS types,
    GROUP_CONCAT(DISTINCT pv.color) AS colors,
    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

    -- total stock
    COALESCE(SUM(pv.stock),0) AS total_stock,

    -- status
    CASE 
        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
        ELSE 'out of stock'
    END AS status,

    -- tags
    GROUP_CONCAT(DISTINCT t.name) AS tags

FROM products p

LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_variants pv ON p.id = pv.product_id
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id

-- 👉 CHANGE HERE (tag filter)
WHERE pt.tag_id = ?

GROUP BY p.id`,[tid]);

            finalResult.push(result[0]);
        }

        const brandId = await com.pool.query('select id from brands where name = ?',[splitName[i]]);

        // const bid = brandId[0][0].id;
        // console.log(bid);

        if(brandId[0].length > 0){
            
        const bid = brandId[0][0].id;
        logger.info(bid);
            const result =  await com.pool.query(`SELECT 
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

    -- images
    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

    -- variants
    GROUP_CONCAT(DISTINCT pv.type) AS types,
    GROUP_CONCAT(DISTINCT pv.color) AS colors,
    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

    -- total stock
    COALESCE(SUM(pv.stock),0) AS total_stock,

    -- status
    CASE 
        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
        ELSE 'out of stock'
    END AS status,

    -- tags
    GROUP_CONCAT(DISTINCT t.name) AS tags

FROM products p

LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_variants pv ON p.id = pv.product_id
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id

-- 👉 BRAND FILTER
WHERE p.brand_id = ?

GROUP BY p.id`,[bid]);
            finalResult.push(result[0]);
        } 

        const result =  await com.pool.query(`SELECT 
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

                WHERE p.name = ?`,[splitName[i]]);

            finalResult.push(result[0]);

        }

         // console.log('finalResult',finalResult);

        const flat = finalResult.flat();

        // console.log('flat',flat);

        const unique = [];

        flat.forEach(item => {
        if (!unique.some(u => u.name === item.name)) {
            unique.push(item);
        }
        });

        // console.log(unique);

        return unique;

    }catch(error){
        logger.error({
            message: error.message,
            stack: error.stack
        });

        throw new AppError('Failed to search product',500);
    }
}


exports.ThirdsearchProduct = async (name)=>{
    try{

        const splitName = name.split(' ');

        const first = splitName[0] +' '+ splitName[1];
        // console.log('first',first);
        const second = splitName[1] +' '+ splitName[2];
        // console.log('second',second);

        const looping =[first,splitName[2],splitName[0],second];

        // console.log(looping);

        // console.log('FirstLoop',firstLoop);

        // const secondLoop = [splitName[0],second];

        // console.log('SecondLoop',secondLoop);


        // let finalResult = [...new Map(finalResult.map(item => [item['name'], item])).values()];

        let finalResult = [];


        //First one name loop


        for(let i = 0; i < splitName.length; i++){
            
            const catId = await com.pool.query('select id from categories where name = ?',[splitName[i]]);

        if(catId[0].length > 0){
            
            const cid = catId[0][0].id;
            logger.info(cid);

            const result =  await com.pool.query(`SELECT 
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

                    -- images
                    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
                    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

                    -- variants
                    GROUP_CONCAT(DISTINCT pv.type) AS types,
                    GROUP_CONCAT(DISTINCT pv.color) AS colors,
                    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
                    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

                    -- total stock
                    COALESCE(SUM(pv.stock),0) AS total_stock,

                    -- status
                    CASE 
                        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
                        ELSE 'out of stock'
                    END AS status,

                    -- tags
                    GROUP_CONCAT(DISTINCT t.name) AS tags

                FROM products p

                LEFT JOIN brands b ON p.brand_id = b.id
                LEFT JOIN categories c ON p.category_id = c.id
                LEFT JOIN product_images pi ON p.id = pi.product_id
                LEFT JOIN product_variants pv ON p.id = pv.product_id
                LEFT JOIN product_tags pt ON p.id = pt.product_id
                LEFT JOIN tags t ON pt.tag_id = t.id

                WHERE p.category_id = ?

                GROUP BY p.id`,[cid]);
                // return result[0];

            finalResult.push(result[0]);
        
        }

        const tagId = await com.pool.query('select id from tags where name = ?',[splitName[i]]);

        // const tid = tagId[0][0].id;
        // console.log(tid);

        if(tagId[0].length > 0){
            const tid = tagId[0][0].id;
        logger.info(tid);
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

    -- images
    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

    -- variants
    GROUP_CONCAT(DISTINCT pv.type) AS types,
    GROUP_CONCAT(DISTINCT pv.color) AS colors,
    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

    -- total stock
    COALESCE(SUM(pv.stock),0) AS total_stock,

    -- status
    CASE 
        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
        ELSE 'out of stock'
    END AS status,

    -- tags
    GROUP_CONCAT(DISTINCT t.name) AS tags

FROM products p

LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_variants pv ON p.id = pv.product_id
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id

-- 👉 CHANGE HERE (tag filter)
WHERE pt.tag_id = ?

GROUP BY p.id`,[tid]);

            finalResult.push(result[0]);
        }

        const brandId = await com.pool.query('select id from brands where name = ?',[splitName[i]]);

        // const bid = brandId[0][0].id;
        // console.log(bid);

        if(brandId[0].length > 0){
            
        const bid = brandId[0][0].id;
        logger.info(bid);
            const result =  await com.pool.query(`SELECT 
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

    -- images
    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

    -- variants
    GROUP_CONCAT(DISTINCT pv.type) AS types,
    GROUP_CONCAT(DISTINCT pv.color) AS colors,
    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

    -- total stock
    COALESCE(SUM(pv.stock),0) AS total_stock,

    -- status
    CASE 
        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
        ELSE 'out of stock'
    END AS status,

    -- tags
    GROUP_CONCAT(DISTINCT t.name) AS tags

FROM products p

LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_variants pv ON p.id = pv.product_id
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id

-- 👉 BRAND FILTER
WHERE p.brand_id = ?

GROUP BY p.id`,[bid]);
            finalResult.push(result[0]);
        } 

        const result =  await com.pool.query(`SELECT 
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

                WHERE p.name = ?`,[splitName[i]]);

            finalResult.push(result[0]);

        }


        //second loop name filter

        for(let j=0; j < looping.length; j++){

             const catId = await com.pool.query('select id from categories where name = ?',[looping[j]]);

        if(catId[0].length > 0){
            
            const cid = catId[0][0].id;
            logger.info(cid);

            const result =  await com.pool.query(`SELECT 
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

                    -- images
                    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
                    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

                    -- variants
                    GROUP_CONCAT(DISTINCT pv.type) AS types,
                    GROUP_CONCAT(DISTINCT pv.color) AS colors,
                    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
                    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

                    -- total stock
                    COALESCE(SUM(pv.stock),0) AS total_stock,

                    -- status
                    CASE 
                        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
                        ELSE 'out of stock'
                    END AS status,

                    -- tags
                    GROUP_CONCAT(DISTINCT t.name) AS tags

                FROM products p

                LEFT JOIN brands b ON p.brand_id = b.id
                LEFT JOIN categories c ON p.category_id = c.id
                LEFT JOIN product_images pi ON p.id = pi.product_id
                LEFT JOIN product_variants pv ON p.id = pv.product_id
                LEFT JOIN product_tags pt ON p.id = pt.product_id
                LEFT JOIN tags t ON pt.tag_id = t.id

                WHERE p.category_id = ?

                GROUP BY p.id`,[cid]);
                // return result[0];

            finalResult.push(result[0]);
        
        }

        const tagId = await com.pool.query('select id from tags where name = ?',[looping[j]]);

        // const tid = tagId[0][0].id;
        // console.log(tid);

        if(tagId[0].length > 0){
            const tid = tagId[0][0].id;
        logger.info(tid);
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

    -- images
    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

    -- variants
    GROUP_CONCAT(DISTINCT pv.type) AS types,
    GROUP_CONCAT(DISTINCT pv.color) AS colors,
    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

    -- total stock
    COALESCE(SUM(pv.stock),0) AS total_stock,

    -- status
    CASE 
        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
        ELSE 'out of stock'
    END AS status,

    -- tags
    GROUP_CONCAT(DISTINCT t.name) AS tags

FROM products p

LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_variants pv ON p.id = pv.product_id
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id

-- 👉 CHANGE HERE (tag filter)
WHERE pt.tag_id = ?

GROUP BY p.id`,[tid]);

            finalResult.push(result[0]);
        }

        const brandId = await com.pool.query('select id from brands where name = ?',[looping[j]]);

        // const bid = brandId[0][0].id;
        // console.log(bid);

        if(brandId[0].length > 0){
            
        const bid = brandId[0][0].id;
        logger.info(bid);
            const result =  await com.pool.query(`SELECT 
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

    -- images
    GROUP_CONCAT(DISTINCT pi.image_url) AS images,
    GROUP_CONCAT(DISTINCT pi.public_id) AS public_ids,

    -- variants
    GROUP_CONCAT(DISTINCT pv.type) AS types,
    GROUP_CONCAT(DISTINCT pv.color) AS colors,
    GROUP_CONCAT(DISTINCT pv.size) AS sizes,
    GROUP_CONCAT(DISTINCT pv.weight) AS weights,

    -- total stock
    COALESCE(SUM(pv.stock),0) AS total_stock,

    -- status
    CASE 
        WHEN COALESCE(SUM(pv.stock),0) > 0 THEN 'isAvailable'
        ELSE 'out of stock'
    END AS status,

    -- tags
    GROUP_CONCAT(DISTINCT t.name) AS tags

FROM products p

LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_variants pv ON p.id = pv.product_id
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id

-- 👉 BRAND FILTER
WHERE p.brand_id = ?

GROUP BY p.id`,[bid]);
            finalResult.push(result[0]);
        } 

        const result =  await com.pool.query(`SELECT 
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

                WHERE p.name = ?`,[looping[j]]);

            finalResult.push(result[0]);

        }


        // console.log('finalResult',finalResult);

        const flat = finalResult.flat();

        // console.log('flat',flat);

        const unique = [];

        flat.forEach(item => {
        if (!unique.some(u => u.name === item.name)) {
            unique.push(item);
        }
        });

        // console.log(unique);

        return unique;

    }catch(error){
        logger.error({
            error: error.message,
            stack: error.stack
        })
        throw new AppError('Failed to search product',500);
    }
}