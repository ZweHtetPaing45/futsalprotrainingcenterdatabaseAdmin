const AppError = require("../../../utils/AppError");
const logger = require("../../../utils/logger");
const com = require('../../../config/com');
const uploader = require('@zwehtetpaing55/uploader');


exports.addgeneralSetting = async (shop_name,contact_info,address,social_link,file)=>{

    console.log('Shop Name',shop_name);
    console.log('Contact Info',contact_info);
    console.log('Address',address);
    console.log('Social Link',social_link);
    console.log('File',file);

    const result = await uploader.upload(file, 'general_setting_logo');
    
        const imageUrl = result.image_url;
    
        console.log('imageUrl',imageUrl);
    
        const publicId = result.public_id;
    
        console.log('publicId',publicId);

    const [addgeneralSetting] = await com.pool.query('insert into general(logo_image_url,public_id,shop_name,contact_info,address,social_link) values (?,?,?,?,?,?)',[imageUrl,publicId,shop_name,contact_info,address,social_link]);

    if(!addgeneralSetting)throw new AppError('Failed to add general setting',500);

    return true;
}

exports.showgeneralSetting = async ()=>{

    const [showgeneralSetting] = await com.pool.query('select * from general');

    if(!showgeneralSetting)throw new AppError('Failed to show general setting',500);

    console.log('showgeneralSetting',showgeneralSetting);

    return showgeneralSetting;

}

exports.updategeneralSetting = async (id,shop_name,contact_info,address,social_link,file)=>{

    
  let query = "UPDATE general SET ";
  let values = [];


  // -------- TEXT FIELDS --------
  if (shop_name !== '') {
    query += "shop_name = ?, ";
    values.push(shop_name);
  }

  if (contact_info !== '') {
    query += "contact_info = ?, ";
    values.push(contact_info);
  }

  if (address !== '') {
    query += "address = ?, ";
    values.push(address);
  }

  if (social_link !== '') {
    query += "social_link = ?, ";
    values.push(social_link);
  }
  

  if (file) {
    const [old] = await com.pool.query(
      "SELECT public_id FROM general WHERE id = ?",
      [id]
    );

    console.log("old", old);

    const pu_id = old[0]?.public_id;

    if (pu_id) {
      await uploader.delete(pu_id);
    }

    const result = await uploader.upload(file, "general_setting_logo");

    query += "logo_image_url = ?, public_id = ?, ";
    values.push(result.image_url, result.public_id);
  }

   // ❗️ ဘာမှ update မရှိဘူးဆို
  if (values.length === 0) {
    return false;
  }

   // remove last comma
  query = query.slice(0, -2);

  query += " WHERE id = ?";
  values.push(id);

  console.log(query, values);

  const [result] = await com.pool.query(query, values);

  console.log(result);

  return true;
}