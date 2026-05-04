const com = require('../../../config/com');
const { validate } = require('../../../middlewares/joi');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


exports.showMenu = async ()=>{

    const [result] = await com.pool.query(`
        select 
        canteen_products.id,
        canteen_category.name as category_name,
        canteen_products.name,
        canteen_products.price,
        canteen_products.image_url,
        case when canteen_products.available = 1 then 'true' else 'false' end as available 
        from canteen_products join canteen_category on canteen_products.category_id = canteen_category.id`);

    if(!result)throw new AppError('Failed to show menu',500);
    if(result.length === 0)throw new AppError('Menu not found',404);

    return result;

}

exports.showMenuCategory = async ()=>{

    const [result] = await com.pool.query(`select id,name from canteen_category`);

    if(!result)throw new AppError('Failed to show menu category',500);
    if(result.length === 0)throw new AppError('Menu category not found',404);

    return result;

}

exports.addMenu = async (name,price,available,file,category_name)=>{

    var imageUrl;
    var publicId;

    // console.log(available);

    const value = available === 'true' ? 1 : 0;

    // console.log(value);

    if(file){

        const result = await uploader.upload(file,"canteens_menu_photo");

        if(!result)throw new AppError('Failed to upload image',500);

        imageUrl = result.image_url;
        publicId = result.public_id;

    }

    // console.log(imageUrl);
    // console.log(publicId);

    const [findCategoryname] = await com.pool.query('select id from canteen_category where name = ?',[category_name]);

    if(findCategoryname.length === 0)throw new AppError('Category not found',404);

    const category_id = findCategoryname[0].id;

    // console.log('category_id',category_id); 

    const result = await com.pool.query('insert into canteen_products(name,category_id,price,image_url,public_url,available) values (?,?,?,?,?,?)',[name,category_id,price,imageUrl,publicId,value]);

    if(!result)throw new AppError('Failed to create menu',500);

    if(result.affectedRows === 0)throw new AppError('Failed to create menu',500);

    return true;

}


exports.addMenuCategory = async (name)=>{

    const result = await com.pool.query('insert into canteen_category (name) values (?)',[name]);

    if(!result)throw new AppError('Failed to create menu category',500);

    return true;

}

exports.updateMenuCategory = async (id,name)=>{
    
    const result = await com.pool.query('update canteen_category set name = ? where id = ?',[name,id]);

    if(result.affectedRows === 0)throw new AppError('Failed to update menu category',404);

    return true;

}

exports.updateMenu = async (id,name,price,available,file,category_name)=>{


    let query = "UPDATE canteen_products SET ";
    let values = [];

    if(name !== '') {
    query += "name = ?, ";
    values.push(name);
    }

    if(price !== ''){
        query += "price = ?, ";
        values.push(price);
    }

    if(category_name !== ''){
                const [findCategoryname] = await com.pool.query('select id from canteen_category where name = ?',[category_name]);

                if(findCategoryname.length === 0)throw new AppError('Category not found',404);   

                const category_id = findCategoryname[0].id;

        query += "category_id = ?, ";
        values.push(category_id);
    }

    if(available !== ''){

        // if(available === 'true')available = 1;
        // else available = 0;

        available = available === 'true' ? 1 : 0;

        console.log(available);
        
        query += "available = ?, ";
        values.push(available);
    }

    if (file) {
    const [old] = await com.pool.query(
      "SELECT public_url FROM canteen_products WHERE id = ?",
      [id]
    );

    console.log('old',old);

    const pu_id = old[0]?.public_url;

    console.log('pu_id',pu_id);

    if (pu_id) {
      await uploader.delete(pu_id);
    }

    const result = await uploader.upload(file, "canteens_menu_photo");

    query += "image_url = ?, public_url = ?, ";
    values.push(result.image_url, result.public_id);
  }

  if (values.length === 0) {
    return false;
  }

    query = query.slice(0, -2);

    query += " WHERE id = ?";
    values.push(id);

    const [result] = await com.pool.query(query, values);

    if(result.affectedRows === 0)throw new AppError('Failed to update menu',404);

    return true;

}

exports.deleteMenuCategory = async (id)=>{

    const result = await com.pool.query('delete from canteen_category where id = ?',[id]);

    if(result.affectedRows === 0)throw new AppError('Failed to delete menu category',404);

    return true;

}

exports.deleteMenu = async (id)=>{

    const [old] = await com.pool.query('select public_url from canteen_products where id = ?',[id]);

    const pu_id = old[0]?.public_url;

    if (pu_id) {
      await uploader.delete(pu_id);
    }

    const result = await com.pool.query('delete from canteen_products where id = ?',[id]);

    if(result.affectedRows === 0)throw new AppError('Failed to delete menu',404);

    return true;

}