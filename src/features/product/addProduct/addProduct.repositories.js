const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');


exports.addingProduct = async (productName,brand,made,type,stock,description,
        category,cost,color,weight,rating,imageUrl,publicId,
        tags,price,size,warranty,date) =>
        {
            try{

                // console.log(category);

                // console.log(tags);
                // console.log(brand);
                // console.log(made);
                // console.log(description);
                // console.log(category);
                // console.log(cost);
                // console.log(color);
                // console.log(weight);
                // console.log(rating);
                // console.log(imageUrl);
                // console.log(publicId);
                // console.log(tags);
                // console.log(price);
                // console.log(size);
                // console.log(warranty);
                // console.log(date);

                //adding the new product create 1 to 7 table .using database is one-to-many relation database

                const [categoryRows]  = await com.pool.query("select id from categories where name = ?",[category]);
                
                // if(categoryRows.length === 0)throw new AppError('category not found',404);

                const categoryId = categoryRows[0].id;

                console.log(categoryId);

                if(!categoryId)throw new AppError('can not get id to category',500);

                const [insertTag] = await com.pool.query("select id from tags where name = ?",[tags]);
                if(insertTag.length === 0)throw new AppError('tag not found',404);

                const tagId = insertTag[0].id;


                console.log(tagId);

                if(!tagId)throw new AppError('can not get id to tag',500);

                // await com.pool.query('insert into brands (name) values(?)', [brand]);
                const [brandId] = await com.pool.query('select id from brands where name = ?', [brand]);

                let bId ;

                if(brandId.length > 0) {

                    bId = brandId[0].id;
                    
                }else{

                    const [result] = await com.pool.query('insert into brands (name) values(?)', [brand]);

                    bId = result.insertId;
                }

                                console.log(brandId);

                // if(await com.pool.query('select id from brands where name = ?', [brand])){
                //          await com.pool.query('insert into brands (name) values(?)', [brand]);
                // }

                if(brandId.length === 0)throw new AppError('brand not found',404);

                const bid = brandId[0].id;


                console.log(bid);

                if(!bid)throw new AppError('can not get id to brand',500);
            
                await com.pool.query('insert into products (name,category_id,brand_id,cost,price,description,warranty,rating,made) values(?,?,?,?,?,?,?,?,?)',
                    [productName,categoryId,bid,cost,price,description,warranty,rating,made]);

                const [productId] = await com.pool.query('select id from products where name = ? and category_id = ? and brand_id = ? and cost = ? and price = ? and description = ? and warranty = ? and rating = ? and made = ?',
                    [productName,categoryId,bid,cost,price,description,warranty,rating,made]);

                const proId = productId[0].id;



                console.log(proId);

                if(!proId)throw new AppError('can not get id to product',500);

                await com.pool.query('insert into product_images (product_id,image_url,public_id) values(?,?,?)',
                    [proId,imageUrl,publicId]);

                await com.pool.query('insert into product_tags(product_id,tag_id) values(?,?)',[proId,tagId]);

                await com.pool.query('insert into product_variants(product_id,color,size,type,weight,stock,date) values(?,?,?,?,?,?,?)',
                    [proId,color,size,type,weight,stock,date]);

                console.log(true);

                return true;

            }catch(error){
                logger.error({
                 message: error.message,
                 stack: error.stack
        });
        throw new AppError('Failed to create user',500);
            }
        }