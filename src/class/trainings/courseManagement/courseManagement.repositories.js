const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


exports.AddCourse = async (course_name,file) =>{

    let image_url;
    let public_id;

    if(file){

        const result = await uploader.upload(file,'course_images');

        if(!result)throw new AppError('Failed to upload image',500);

        image_url = result.image_url;
        public_id = result.public_id;

    }

    const [insertCourt] = await com.pool.query('insert into training_program (course_name,main_program_banner_image_url,main_program_banner_public_id) values(?,?,?)',[course_name,image_url,public_id]);

    if(!insertCourt)throw new AppError('Failed to create course',500);

    return true;

}

exports.ShowTrainingImage = async () =>{
    const [result] = await com.pool.query('select id,main_program_banner_image_url from training_program');

    if(!result)throw new AppError('Show Training Image Error',400);

    return result;
}

exports.UpdateTraining = async (id,course_name,file) =>{
    
    let query = "UPDATE training_program SET ";
    let values = [];

    if (course_name !== '') {
    query += "course_name = ?, ";
    values.push(course_name);
    }

    if (file) {
    const [old] = await com.pool.query(
      "SELECT main_program_banner_public_id FROM training_program WHERE id = ?",
      [id]
    );

    const pu_id = old[0]?.main_program_banner_public_id;

    console.log('pu_id',pu_id);

    if (pu_id) {
      await uploader.delete(pu_id);
    }

    const result = await uploader.upload(file, "course_images");

    query += "main_program_banner_image_url = ?, main_program_banner_public_id = ?, ";
    values.push(result.image_url, result.public_id);
  }

  if (values.length === 0) {
    return false;
  }

  // remove last comma
  query = query.slice(0, -2);

  query += " WHERE id = ?";
  values.push(id);

  const [result] = await com.pool.query(query, values);

  if (!result) {
    throw new AppError("Failed to update training", 500);
  }

  return true;

}