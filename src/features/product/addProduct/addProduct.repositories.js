const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');



exports.addingProduct = async (productName,brand,made,type,stock,description,
        category,cost,color,weight,rating,file,
        tags,price,size,warranty,date) =>
        {

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

                // const [findProductName] = await com.pool.query('select name from products where name = ?',[productName]);

                // if(findProductName.length > 0){
                //     throw new AppError("Product same name already exist !",400);
                // }

                    const result = await uploader.upload(file,'products_images');

                    const imageUrl = result.image_url;
                    console.log('imageUrl',imageUrl);
                    const publicId = result.public_id;
                    console.log('publicId',publicId);

                //adding the new product create 1 to 7 table .using database is one-to-many relation database

                const [categoryRows]  = await com.pool.query("select id from categories where name = ?",[category]);
                
                // if(categoryRows.length === 0)throw new AppError('category not found',404);

                const categoryId = categoryRows[0].id;

                console.log('category id',categoryId);

                if(!categoryId)throw new AppError('can not get id to category',500);

                const [insertTag] = await com.pool.query("select id from tags where name = ?",[tags]);
                if(insertTag.length === 0)throw new AppError('tag not found',404);

                const tagId = insertTag[0].id;


                console.log('tagId',tagId);

                if(!tagId)throw new AppError('can not get id to tag',500);


                let bId;
                // await com.pool.query('insert into brands (name) values(?)', [brand]);
                const [brandId] = await com.pool.query('select id from brands where name = ?', [brand]);

                if(brandId.length > 0) {

                    bId = brandId[0].id;
                    console.log('Select bId',bId);
                    
                }else{

                    const [result] = await com.pool.query('insert into brands (name) values(?)', [brand]);

                    bId = result.insertId;

                    console.log('Insert bId',bId);
                }

                // console.log('brandId',brandId);


                // if(brandId.length === 0)throw new AppError('brand not found',404);

                const bid = bId;

                console.log('brand id',bid);

                if(!bid)throw new AppError('can not get id to brand',500);
            
                const [insertproduct]= await com.pool.query('insert into products (name,category_id,brand_id,cost,price,description,warranty,rating,made) values(?,?,?,?,?,?,?,?,?)',
                    [productName,categoryId,bid,cost,price,description,warranty,rating,made]);

                if(!insertproduct)throw new AppError('can not insert product',500);

                const [productId] = await com.pool.query('select id from products where name = ? and category_id = ? and brand_id = ? and cost = ? and price = ? and description = ? and warranty = ? and rating = ? and made = ?',
                    [productName,categoryId,bid,cost,price,description,warranty,rating,made]);

                const proId = productId[0].id;


                console.log('product id',proId);

                if(!proId)throw new AppError('can not get id to product',500);

                const [insertImage] = await com.pool.query('insert into product_images (product_id,image_url,public_id) values(?,?,?)',
                    [proId,imageUrl,publicId]);

                console.log('Insert image',insertImage);

                const [productTag] = await com.pool.query('insert into product_tags(product_id,tag_id) values(?,?)',[proId,tagId]);

                console.log('product tag',productTag);

                const [productVariant] = await com.pool.query('insert into product_variants(product_id,color,size,type,weight,stock,date) values(?,?,?,?,?,?,?)',
                    [proId,color,size,type,weight,stock,date]);

                console.log('product variant',productVariant);

                console.log(true);

                return true;

        }