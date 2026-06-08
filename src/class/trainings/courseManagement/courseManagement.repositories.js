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
    const [result] = await com.pool.query('select id,main_program_banner_image_url,course_name from training_program');

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

exports.UpdateTrainingLevel = async (
                training_level_id,
                title_level,
                price,
                description,
                learning_description,
                main_title,
                title,
                about_title,
                details,
                instructor_name,
                biography,
                categoryCardImage,
                learningImage,
                coachFile
)=>{

     
    let query = "UPDATE training_level SET ";
    let values = [];

    if(title_level !== ''){
        query += "title_level = ?, ";
        values.push(title_level);
    }

    if(price !== ''){
        query += "price = ?, ";
        values.push(price);
    }

    if (categoryCardImage) {
    const [old] = await com.pool.query(
      "SELECT category_card_public_id FROM training_level WHERE id = ?",
      [training_level_id]
    );

    const pu_id = old[0]?.category_card_public_id;

    // console.log('pu_id',pu_id);

    if (pu_id) {
      try{
          await uploader.delete(pu_id);
      }catch(error){
        logger.error('Failed to delete old category card image', { error });
      }

    }

    const result = await uploader.upload(categoryCardImage, "course_images");

    query += "category_card_image_url = ?, category_card_public_id = ?, ";
    values.push(result.image_url, result.public_id);
  }


    if(description !== ''){
        query += "description = ?, ";
        values.push(description);
    }

    if(learning_description !== ''){
        query += "learning_description = ?, ";
        values.push(learning_description);
    }

    if(main_title !== ''){
        query += "main_title = ?, ";
        values.push(main_title);
    }

    if(title !== ''){
        query += "title = ?, ";
        values.push(title);
    }

     if (learningImage) {
    const [old] = await com.pool.query(
      "SELECT learning_public_id FROM training_level WHERE id = ?",
      [training_level_id]
    );

    const pu_id = old[0]?.learning_public_id;

    // console.log('pu_id',pu_id);

    if (pu_id) {
      try{

          await uploader.delete(pu_id);

      }catch(error){
        logger.error('Failed to delete old learning image', { error });
      }

    }

    const result = await uploader.upload(learningImage, "course_images");

    query += "learning_image_url = ?, learning_public_id = ?, ";
    values.push(result.image_url, result.public_id);
  }

    if(about_title !== ''){
        query += "about_title = ?, ";
        values.push(about_title);
    }

    if(details !== ''){
        query += "details = ?, ";
        values.push(details);
    }

    if(instructor_name !== ''){
        query += "instructor_name = ?, ";
        values.push(instructor_name);
    }

    if(biography !== ''){
        query += "biography = ?, ";
        values.push(biography);
    }

 

  if (coachFile) {
    const [old] = await com.pool.query(
      "SELECT coach_public_id FROM training_level WHERE id = ?",
      [training_level_id]
    );

    const pu_id = old[0]?.coach_public_id;

    // console.log('pu_id',pu_id);

    if (pu_id) {
      try{
          await uploader.delete(pu_id);
      }catch(error){
        logger.error('Failed to delete old learning image', { error });
      }

    }

    const result = await uploader.upload(coachFile, "course_images");

    query += "coach_image_url = ?, coach_public_id = ?, ";
    values.push(result.image_url, result.public_id);
  }

  
  if (values.length === 0) {
    return false;
  }

  // remove last comma
  query = query.slice(0, -2);

  query += " WHERE id = ?";
  values.push(training_level_id);

  const [result] = await com.pool.query(query, values);

  if (!result) {
    throw new AppError("Failed to update training", 500);
  }

  return true;

    
}