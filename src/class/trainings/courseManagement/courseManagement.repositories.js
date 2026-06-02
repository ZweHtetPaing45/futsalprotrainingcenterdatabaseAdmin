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

exports.UpdateTrainingProgram = async (
    training_program_id,
    category_file,main_program_file,
    learning_file,learning_description,
    main_title,title,about_title,details,
    course_name
) =>{

    let query = "UPDATE training_program SET ";
    let values = [];

    if (course_name !== '') {
    query += "course_name = ?, ";
    values.push(course_name);
    }

    if (main_title !== '') {
    query += "main_title = ?, ";
    values.push(main_title);
    }

    if (learning_description !== '') {
    query += "learning_description = ?, ";
    values.push(learning_description);
    }

    if (title !== '') {
    query += "title = ?, ";
    values.push(title);
    }

    if (about_title !== '') {
    query += "about_title = ?, ";
    values.push(about_title);
    }

    if (details !== '') {
    query += "details = ?, ";
    values.push(details);
    }

    if (category_file) {
    const [old] = await com.pool.query(
      "SELECT category_card_public_id FROM training_program WHERE id = ?",
      [training_program_id]
    );

    const pu_id = old[0]?.category_card_public_id;

    console.log('pu_id',pu_id);

    if (pu_id) {
      await uploader.delete(pu_id);
    }

    const result = await uploader.upload(category_file, "course_images");

    query += "category_card_image_url = ?, category_card_public_id = ?, ";
    values.push(result.image_url, result.public_id);
  }

  if (main_program_file) {
    const [old] = await com.pool.query(
      "SELECT main_program_banner_public_id FROM training_program WHERE id = ?",
      [training_program_id]
    );

    const pu_id = old[0]?.main_program_banner_public_id;

    console.log('pu_id',pu_id);

    if (pu_id) {
      await uploader.delete(pu_id);
    }

    const result = await uploader.upload(main_program_file, "course_images");

    query += "main_program_banner_image_url = ?, main_program_banner_public_id = ?, ";
    values.push(result.image_url, result.public_id);
  }

  if (learning_file) {
    const [old] = await com.pool.query(
      "SELECT learning_public_id FROM training_program WHERE id = ?",
      [training_program_id]
    );

    const pu_id = old[0]?.learning_public_id;

    console.log('pu_id',pu_id);

    if (pu_id) {
      await uploader.delete(pu_id);
    }

    const result = await uploader.upload(learning_file, "course_images");

    query += "learning_image_url = ?, learning_public_id = ?, ";
    values.push(result.image_url, result.public_id);
  }

    if (values.length === 0) {
    return false;
  }

  // remove last comma
  query = query.slice(0, -2);

  query += " WHERE id = ?";
  values.push(training_program_id);

  const [result] = await com.pool.query(query, values);

  if(!result) {
    throw new AppError("Failed to update training", 500);
  }

  console.log('training_program');

  return true;
}

exports.UpdateTrainingCoach = async (
    training_coach_id,
    coach_file,
    instructor_name,
    biography
    )=>{

    let query = "UPDATE training_coach SET ";
    let values = [];

    if (instructor_name !== '') {
    query += "instructor_name = ?, ";
    values.push(instructor_name);
    }

    if (biography !== '') {
    query += "biography = ?, ";
    values.push(biography);
    }

    if (coach_file) {
    const [old] = await com.pool.query(
      "SELECT coach_public_id FROM training_coach WHERE id = ?",
      [training_coach_id]
    );

    const pu_id = old[0]?.coach_public_id;

    console.log('pu_id',pu_id);

    if (pu_id) {
      await uploader.delete(pu_id);
    }

    const result = await uploader.upload(coach_file, "course_images");

    query += "coach_image_url = ?, coach_public_id = ?, ";
    values.push(result.image_url, result.public_id);
  }

  // remove last comma
  query = query.slice(0, -2);

  query += " WHERE id = ?";
  values.push(training_coach_id);

  const [result] = await com.pool.query(query, values);

  if(!result) {
    throw new AppError("Failed to update training", 500);
  }

  console.log('training_coach');

  return true;

}