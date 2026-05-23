const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


exports.TrainingProgram = async (
    category_card_file,main_program_banner_file,
    learning_file,learning_description,main_title,
    title,about_title,details,title_level,about_level,
    price,start_time,end_time,days,level_type,coach_file,
    instructor_name,biography
)=>{

    // console.log('days',days);
    // console.log(typeof days);
    // console.log('start_time',start_time);
    // console.log('end_time',end_time);

    let category_card_image_url;
    let category_card_public_id;

    let main_program_banner_image_url;
    let main_program_banner_public_id;

    let coach_image_url;
    let coach_public_id;

    let learning_image_url;
    let learning_public_id;

    if(category_card_file){

        const result = await uploader.upload(category_card_file,'course_images');

        if(!result)throw new AppError('Failed to upload category card image',500);

        category_card_image_url = result.image_url;
        category_card_public_id = result.public_id;

    }

    if(main_program_banner_file){

        const result = await uploader.upload(main_program_banner_file,'course_images');

        if(!result)throw new AppError('Failed to upload main program banner image',500);

        main_program_banner_image_url = result.image_url;
        main_program_banner_public_id = result.public_id;

    }

    if(coach_file){

        const result = await uploader.upload(coach_file,'course_images');

        if(!result)throw new AppError('Failed to upload coach image',500);

        coach_image_url = result.image_url;
        coach_public_id = result.public_id;

    }

    if(learning_file){

        const result = await uploader.upload(learning_file,'course_images');

        if(!result)throw new AppError('Failed to upload learning image',500);

        learning_image_url = result.image_url;
        learning_public_id = result.public_id;

    }

    const [result1] = await com.pool.query(
        `insert into training_program (
        category_card_image_url,category_card_public_id,
        main_program_banner_image_url,main_program_banner_public_id,
        learning_image_url,learning_public_id,learning_description,
        main_title,title,about_title,details) values(?,?,?,?,?,?,?,?,?,?,?)`,[
        category_card_image_url,category_card_public_id,
        main_program_banner_image_url,main_program_banner_public_id,
        learning_image_url,learning_public_id,learning_description,
        main_title,title,about_title,details]);

    const training_program_id = result1.insertId;

    if(!result1)throw new AppError('Failed to create training program',500);

    // console.log("training_program_id",training_program_id);


    const [result3] = await com.pool.query(
        `insert into training_schedule_days (day,level_type) values(?,?)`,[
            day,level_type
        ]
    );

    if(!result3)throw new AppError('Failed to create training schedule day',500);

    const training_schedule_day_id = result3.insertId;

    const [result2] = await com.pool.query(
        `insert into training_schedule_time_slots (training_schedule_days_id,trainning_program_id,start_time,end_time) values(?,?,?)`,[
            training_schedule_day_id,training_program_id,start_time,end_time
        ]
    );

    if(!result2)throw new AppError('Failed to create training schedule time slot',500);

    const training_schedule_time_slot_id = result2.insertId;

    const dayString = days.replace('[','').replace(']','').split(',');

    // console.log('dayString',dayString);
    // console.log(typeof dayString);

    const day = dayString.join(',');

    const [result4] = await com.pool.query(
        `insert into training_level (trainning_program_id,title_level,price) values(?,?,?)`,[
            training_program_id,title_level,price
        ]
    );

    if(!result4)throw new AppError('Failed to create training level',500);

    const training_level_id = result4.insertId;
    // console.log('training_level_id',training_level_id);

    const [result5] = await com.pool.query(
        `insert into training_coach (trainning_program_id,coach_image_url,coach_public_id,instructor_name,biography) values(?,?,?,?,?)`,[
            training_program_id,coach_image_url,coach_public_id,instructor_name,biography
        ]
    );

    if(!result5)throw new AppError('Failed to create training coach',500);

    // console.log('training_coach_id', result5.insertId);
    return true;
}