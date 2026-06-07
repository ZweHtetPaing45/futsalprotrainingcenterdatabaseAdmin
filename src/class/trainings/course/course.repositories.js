const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


exports.TrainingProgram = async (
    category_card_file,
    learning_file,learning_description,main_title,
    title,about_title,details,title_level,about_level,
    price,start_time,end_time,day_id,coach_file,
    instructor_name,biography,course_id
)=>{

    // console.log('days',days);
    // console.log(typeof days);
    // console.log('start_time',start_time);
    // console.log('end_time',end_time);

    let category_card_image_url;
    let category_card_public_id;

    // let main_program_banner_image_url;
    // let main_program_banner_public_id;

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

    // if(main_program_banner_file){

    //     const result = await uploader.upload(main_program_banner_file,'course_images');

    //     if(!result)throw new AppError('Failed to upload main program banner image',500);

    //     main_program_banner_image_url = result.image_url;
    //     main_program_banner_public_id = result.public_id;

    // }

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


    // const updateOrInsertCourse = await com.pool.query(`
    //     update training_program set
    //       category_card_image_url = ?,
    //       category_card_public_id = ?

    //       where id = ?
    //     `,[category_card_image_url,category_card_public_id,course_id]);

    // const [result1] = await com.pool.query(
    //     `insert into training_program (
    //     category_card_image_url,category_card_public_id,
    //     main_program_banner_image_url,main_program_banner_public_id,
    //     learning_image_url,learning_public_id,learning_description,
    //     main_title,title,about_title,details,course_name) values(?,?,?,?,?,?,?,?,?,?,?,?)`,[
    //     category_card_image_url,category_card_public_id,
    //     main_program_banner_image_url,main_program_banner_public_id,
    //     learning_image_url,learning_public_id,learning_description,
    //     main_title,title,about_title,details,course_name]);

    // const training_program_id = result1.insertId;

    // if(!result1)throw new AppError('Failed to create training program',500);

    // console.log("training_program_id",training_program_id);

    // console.log('days',days);

    // const [result3] = await com.pool.query(
    //     `insert into training_schedule_days (day) values(?)`,[
    //         days
    //     ]
    // );

    // if(!result3)throw new AppError('Failed to create training schedule day',500);

    // const training_schedule_day_id = result3.insertId;

    // const [findTrainingProgramDay] = await com.pool.query(

    const [result4] = await com.pool.query(
        `insert into training_level (training_program_id,title_level,description,price,main_title,title,about_title,details,coach_image_url,coach_public_id,instsuctor_name,biography,learning_image_url,learning_public_id,learning_description,category_card_image_url,category_card_public_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
            course_id,title_level,about_level,price,main_title,title,about_title,details,coach_image_url,coach_public_id,instructor_name,biography,learning_image_url,learning_public_id,learning_description,category_card_image_url,category_card_public_id
        ]
    );

    if(!result4)throw new AppError('Failed to create training level',500);

    const training_level_id = result4.insertId;
    // console.log('training_level_id',training_level_id);

    const [result2] = await com.pool.query(
        `insert into training_schedule_time_slots (training_schedule_days_id,trainning_program_id,start_time,end_time,training_level_id) values(?,?,?,?,?)`,[
            day_id,course_id,start_time,end_time,training_level_id
        ]
    );

    if(!result2)throw new AppError('Failed to create training schedule time slot',500);

    const training_schedule_time_slot_id = result2.insertId;

    // const dayString = days.replace('[','').replace(']','').split(',');

    // // console.log('dayString',dayString);
    // // console.log(typeof dayString);

    // const day = dayString.join(',');

    // const [result5] = await com.pool.query(
    //     `insert into training_coach (training_program_id,coach_image_url,coach_public_id,instructor_name,biography) values(?,?,?,?,?)`,[
    //         course_id,coach_image_url,coach_public_id,instructor_name,biography
    //     ]
    // );

    // if(!result5)throw new AppError('Failed to create training coach',500);

    // console.log('training_coach_id', result5.insertId);
    return true;
}


exports.AddDayTimeTraining = async (training_program_id,training_schedule_days_id,start_time,end_time,training_level_id)=>{

    const [result] = await com.pool.query(
        `insert into training_schedule_time_slots (training_schedule_days_id,trainning_program_id,start_time,end_time,training_level_id) values(?,?,?,?,?)`,[
            training_schedule_days_id,training_program_id,start_time,end_time,training_level_id
        ]
    );
    
    if(!result)throw new AppError('Failed to add day and time for training program',500);    

    return true;
}

exports.AddTrainingLevel = async (training_program_id,description,title_level,price,main_title,title,about_title,details,coach_file,instsuctor_name,biography)=>{

    let coach_image_url;
    let coach_public_id;

    if(coach_file){
        const result = await uploader.upload(coach_file,'course_images');
        
        if(!result)throw new AppError('Failed to upload coach image',500);

        coach_image_url = result.image_url;
        coach_public_id = result.public_id;
    }

    const result = await com.pool.query('insert into training_level (training_program_id,description,title_level,price,main_title,title,about_title,details,coach_image_url,coach_public_id,instsuctor_name,biography) values(?,?,?,?,?,?,?,?,?,?,?,?)',[training_program_id,description,title_level,price,main_title,title,about_title,details,coach_image_url,coach_public_id,instsuctor_name,biography]);

    if(!result)throw new AppError('Failed to add training level',500);

    return true;

}

exports.ShowTraining = async (id) => {

    const [result] = await com.pool.query(
        `SELECT 
            tp.id,
            tp.course_name,

            -- training levels
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', tl.id,
                        'title_level', tl.title_level,
                        'price', tl.price,
                        'description', tl.description,
                        'main_title', case when tl.optional_active = 1 then tl.main_title else null end,
                        'title', case when tl.optional_active = 1 then tl.title else null end,
                        'about_title', case when tl.optional_active = 1 then tl.about_title else null end,
                        'details', case when tl.optional_active = 1 then tl.details else null end,
                        'coach_image_url', tl.coach_image_url,
                        'instsuctor_name', tl.instsuctor_name,
                        'biography' , tl.biography,
                        'learning_image_url', tl.learning_image_url,
                        'learning_description', tl.learning_description,
                        'category_card_image_url', tl.category_card_image_url
                    )
                )
                FROM training_level tl
                WHERE tl.training_program_id = tp.id
            ) AS levels,


            -- schedules
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'slot_id', tst.id,
                        'day_id', tsd.id,
                        'day', tsd.day,
                        'training_level_id', tst.training_level_id,
                        'start_time', tst.start_time,
                        'end_time', tst.end_time
                    )
                )
                FROM training_schedule_time_slots tst
                JOIN training_schedule_days tsd
                    ON tsd.id = tst.training_schedule_days_id
                WHERE tst.trainning_program_id = tp.id
            ) AS schedules

        FROM training_program tp where tp.id = ?`, [id]
    );

    if (!result || result.length === 0) {
        return [];
    }

    return result;
};



exports.DeleteTrainingStudent = async (id,source)=>{


    if(source === 'admin'){

        const [findAdminImage] = await com.pool.query('select payment_public_id from admin_training_students where id = ? and source = ?',[id,source]);

        // if(!findAdminStudent)throw new AppError('Failed to find admin student',500);

        console.log('findAdminStudent',findAdminImage[0].payment_public_id);

        if(findAdminImage[0].payment_public_id){

            await uploader.delete(findAdminImage[0].payment_public_id);

        }

        const DeleteAdminStudent = await com.pool.query('delete from admin_training_students where id = ? and source = ?',[id,source]);

        if(!DeleteAdminStudent)throw new AppError('Delete admin training student Error',400);

        return true;

    }else if(source === 'mobile'){

        const [findMobileImage] = await com.pool.query('select payment_image_url from mobile_training_students where id = ? and source = ?',[id,source]);

        console.log('findMobileImage',findMobileImage[0].payment_image_url);

        console.log('payment_public_id',findMobileImage[0].payment_public_id);

        const payment_public_id = findMobileImage[0].payment_public_id;

        if(findMobileImage[0].payment_image_url){

            await uploader.delete(payment_public_id);

        }

        const DeleteAdminStudent = await com.pool.query('delete from mobile_training_students where id = ? and source = ?',[id,source]);

        if(!DeleteAdminStudent)throw new AppError('Delete admin training student Error',400);

        return true;

    }

    return false;

}

exports.ShowDays = async ()=>{

    const [days] = await com.pool.query('select id,day from training_schedule_days');

    if(!days)throw new AppError('Failed to find days',500);

    if(days.length === 0){
        return [];
    }

    return days;
}

exports.DeleteTrainingLevel = async (level_id)=>{

    const [find_training_level_image] = await com.pool.query('select coach_image_url,coach_public_id,learning_image_url,learning_public_id,category_card_image_url,category_card_public_id from training_level where id = ?',[level_id]);

    console.log(find_training_level_image[0].coach_image_url);

    if(find_training_level_image[0].coach_public_id){
        try{
            
            await uploader.delete(find_training_level_image[0].coach_public_id);

        }catch(error){
            logger.error('find_training_level_image',error);
        }
    }

    if(find_training_level_image[0].learning_public_id){
        try{

            await uploader.delete(find_training_level_image[0].learning_public_id);

        }catch(error){
            logger.error('find_training_level_image',error);
        }
    }

    if(find_training_level_image[0].category_card_public_id){
        try{

            await uploader.delete(find_training_level_image[0].category_card_public_id);

        }catch(error){
            logger.error('find_training_level_image',error);
        }
    }

    const result = await com.pool.query('delete from training_level where id = ?',[level_id]);

    if(result.affectedRows === 0)throw new AppError('Failed to delete training level',404);

    return true;

}

exports.DeleteTrainingSchedule = async (schedule_id)=>{

    const result = await com.pool.query('delete from training_schedule_time_slots where id = ?',[schedule_id]);

    if(result.affectedRows === 0)throw new AppError('Failed to delete training schedule',404);

    return true;

}

exports.DeleteTrainingProgram = async (program_id)=>{

    const [find_training_program_publicId] = await com.pool.query('select main_program_banner_public_id from training_program where id = ?',[program_id]);

    console.log('find_training_program_publicId',find_training_program_publicId);


    // if(find_training_program_publicId[0].category_card_public_id){
        
    //     try{
    //         await uploader.delete(find_training_program_publicId[0].category_card_public_id);
    
    //     }catch(error){
    //         logger.error('category_card_public_id',error);
    //     }

    // }

    if(find_training_program_publicId[0].main_program_banner_public_id){

        try{
                await uploader.delete(find_training_program_publicId[0].main_program_banner_public_id);
        }catch(error){
            logger.error('main_program_banner_public_id',error);
        }

    }

    // if(find_training_program_publicId[0].learning_public_id){
        
    //     try{
    //         await uploader.delete(find_training_program_publicId[0].learning_public_id);
    //     }catch(error){
    //         logger.error('learning_public_id',error);
    //     }

    // }

    const [find_level_coach_public_id] = await com.pool.query('select coach_public_id,coach_image_url,learning_image_url,learning_public_id,category_card_image_url,category_card_public_id from training_level where training_program_id = ?',[program_id]);

    if(find_level_coach_public_id){

    console.log('coach_image_url',find_level_coach_public_id[0].coach_image_url);
    console.log('learning_image_url',find_level_coach_public_id[0].learning_image_url);
    console.log('category_card_image_url',find_level_coach_public_id[0].category_card_image_url);

    for(let i=0; i<find_level_coach_public_id.length; i++){

        if(find_level_coach_public_id[i].coach_public_id){
        try{
            await uploader.delete(find_level_coach_public_id[i].coach_public_id);
        }catch(error){
            logger.error('coach_public_id',error);
        }
    }

        if(find_level_coach_public_id[i].learning_public_id){
            try{

                await uploader.delete(find_level_coach_public_id[i].learning_public_id);

            }catch(error){
                logger.error('learning_public_id',error);
            }
        }

        if(find_level_coach_public_id[i].category_card_public_id){
            try{

                await uploader.delete(find_level_coach_public_id[i].category_card_public_id);

            }catch(error){
                logger.error('category_card_public_id',error);
            }
        }

    }

}
    const [delete_training_level] = await com.pool.query('delete from training_level where training_program_id = ?',[program_id]);

    console.log('delete_training_level',delete_training_level);

    // if(!delete_training_level)throw new AppError('Failed to delete training program',404);

    const [delete_training_schedule] = await com.pool.query('delete from training_schedule_time_slots where trainning_program_id = ?',[program_id]);

    if(!delete_training_schedule)throw new AppError('Failed to delete training program',404);

    console.log('delete_training_schedule',delete_training_schedule);

    const [delete_training_program] = await com.pool.query('delete from training_program where id = ?',[program_id]);

    if(!delete_training_program === 0)throw new AppError('Failed to delete training program',404);
    
    return true;
}


exports.UpdateTrainingProgramTimeSlot = async (schedule_id,start_time,end_time)=>{

    let query = 'update training_schedule_time_slots set ';
    let values = [];

    if(start_time){
        query += 'start_time = ?,';
        values.push(start_time);
    }

    if(end_time){
        query += 'end_time = ?,';
        values.push(end_time);
    }

     if (values.length === 0) {
    return false;
  }

   // remove last comma
  query = query.slice(0, -1);

  query += " WHERE id = ?";
  values.push(schedule_id);

  const [result] = await com.pool.query(query, values);

  if(result.affectedRows === 0)throw new AppError('Failed to update training schedule time slot',404);

  return true;

}

exports.UpdateTrainingLevelOptionalActive = async (level_id,active)=>{

    const [result] = await com.pool.query('update training_level set optional_active = ? where id = ?',[active,level_id]);

    if(result.affectedRows === 0)throw new AppError('Failed to update training level optional active',404);

    return true;

}

exports.GetTrainingLevelAndCourse = async (program_id)=>{
    
    const [result] = await com.pool.query(`
        
           SELECT
    tp.id AS training_program_id,
    tp.course_name,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'training_level_id', tl.id,
            'title_level', tl.title_level,
            'price', tl.price
        )
    ) AS levels
FROM training_program tp
LEFT JOIN training_level tl
    ON tp.id = tl.training_program_id
WHERE tp.id = ?
GROUP BY tp.id, tp.course_name;  
        `,[program_id]);

    if(result.length === 0){
        return [];
    }

    return result;

}