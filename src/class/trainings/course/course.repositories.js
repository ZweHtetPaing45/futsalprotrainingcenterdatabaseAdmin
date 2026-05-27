const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


exports.TrainingProgram = async (
    category_card_file,main_program_banner_file,
    learning_file,learning_description,main_title,
    title,about_title,details,title_level,about_level,
    price,start_time,end_time,days,coach_file,
    instructor_name,biography,course_name
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
        main_title,title,about_title,details,course_name) values(?,?,?,?,?,?,?,?,?,?,?,?)`,[
        category_card_image_url,category_card_public_id,
        main_program_banner_image_url,main_program_banner_public_id,
        learning_image_url,learning_public_id,learning_description,
        main_title,title,about_title,details,course_name]);

    const training_program_id = result1.insertId;

    if(!result1)throw new AppError('Failed to create training program',500);

    // console.log("training_program_id",training_program_id);

    console.log('days',days);

    const [result3] = await com.pool.query(
        `insert into training_schedule_days (day) values(?)`,[
            days
        ]
    );

    if(!result3)throw new AppError('Failed to create training schedule day',500);

    const training_schedule_day_id = result3.insertId;

    console.log('training_schedule_day_id',training_schedule_day_id);

    const [result4] = await com.pool.query(
        `insert into training_level (training_program_id,title_level,description,price) values(?,?,?,?)`,[
            training_program_id,title_level,about_level,price
        ]
    );

    if(!result4)throw new AppError('Failed to create training level',500);

    const training_level_id = result4.insertId;
    // console.log('training_level_id',training_level_id);

    const [result2] = await com.pool.query(
        `insert into training_schedule_time_slots (training_schedule_days_id,trainning_program_id,start_time,end_time,training_level_id) values(?,?,?,?,?)`,[
            training_schedule_day_id,training_program_id,start_time,end_time,training_level_id
        ]
    );

    if(!result2)throw new AppError('Failed to create training schedule time slot',500);

    const training_schedule_time_slot_id = result2.insertId;

    // const dayString = days.replace('[','').replace(']','').split(',');

    // // console.log('dayString',dayString);
    // // console.log(typeof dayString);

    // const day = dayString.join(',');

    const [result5] = await com.pool.query(
        `insert into training_coach (training_program_id,coach_image_url,coach_public_id,instructor_name,biography) values(?,?,?,?,?)`,[
            training_program_id,coach_image_url,coach_public_id,instructor_name,biography
        ]
    );

    if(!result5)throw new AppError('Failed to create training coach',500);

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

exports.AddTrainingLevel = async (training_program_id,description,title_level,price)=>{

    const result = await com.pool.query('insert into training_level (training_program_id,description,title_level,price) values(?,?,?,?)',[training_program_id,description,title_level,price]);

    if(!result)throw new AppError('Failed to add training level',500);

    return true;

}

exports.ShowTraining = async () => {

    const [result] = await com.pool.query(
        `SELECT 
            tp.id,
            tp.category_card_image_url,
            tp.main_program_banner_image_url,
            tp.learning_image_url,
            tp.main_title,
            tp.title,
            tp.about_title,
            tp.details,
            tp.learning_description,

            -- training levels
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', tl.id,
                        'title_level', tl.title_level,
                        'price', tl.price
                    )
                )
                FROM training_level tl
                WHERE tl.training_program_id = tp.id
            ) AS levels,

            -- coaches
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', tc.id,
                        'instructor_name', tc.instructor_name,
                        'biography', tc.biography,
                        'coach_image_url', tc.coach_image_url
                    )
                )
                FROM training_coach tc
                WHERE tc.training_program_id = tp.id
            ) AS coaches,

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

        FROM training_program tp`
    );

    if (!result || result.length === 0) {
        throw new AppError('Show Training Error', 400);
    }

    return result;
};


exports.AddTrainingStudent = async (name,gender,age,phone,email,payment_id,training_program_id,training_level_id,file)=>{

    let image_url;
    let public_id;

    if(file){

        const result = await uploader.upload(file,'training_student_payment_image');

        image_url = result.image_url;
        public_id = result.public_id;

        console.log('image_url',image_url);
        console.log('public_id',public_id);

    }

    let [insertTrainingStudent] = await com.pool.query(`
        insert into admin_training_students (payment_id,training_program_id,training_level_id,name,gender,age,phone,email,payment_image_url,payment_public_id) values(?,?,?,?,?,?,?,?,?,?)`,[
            payment_id,training_program_id,training_level_id,name,gender,age,phone,email,image_url,public_id
        ]
        );

    if(!insertTrainingStudent)throw new AppError('Failed to add training student',500);

    const training_student_id = insertTrainingStudent.insertId;

    console.log('training_student_id',training_student_id);

    const [findTimeSlots] = await com.pool.query('select * from training_schedule_time_slots where training_level_id = ? and trainning_program_id = ?;',[training_level_id,training_program_id]);

    if(!findTimeSlots)throw new AppError('Failed to find time slots',500);

    console.log('findTimeSlots',findTimeSlots);

    console.log('findTimeSlots.length',findTimeSlots.length);

    console.log(findTimeSlots[0].id);

    for(let i=0; i<findTimeSlots.length; i++){

        const [insertTrainingSchedule] = await com.pool.query('insert into admin_training_student_time_slots (admin_training_students_id,training_schedule_time_slot_id) values(?,?)',[training_student_id,findTimeSlots[i].id]);

        if(!insertTrainingSchedule)throw new AppError('Failed to add training student time slot',500);

        // console.log('insertTrainingSchedule',insertTrainingSchedule);

    }

    // const [findStudent] = await com.pool.query('select name,gender,age,phone,email,payment_image_url from admin_training_students where id = ?',[training_student_id]);

    // if(!findStudent)throw new AppError('Failed to find student',500);

    // const [findStudentTimeSlots] = await com.pool.query('select * from admin_training_student_time_slots where admin_training_students_id = ?',[training_student_id]);

    // if(!findStudentTimeSlots)throw new AppError('Failed to find student time slots',500);


    // console.log('findStudent',findStudent);
    // console.log('findStudentTimeSlots',findStudentTimeSlots);

    // let scheduleData = [];

    // for(let j=0; j<findStudentTimeSlots.length; j++){

    //     const [findScheduleTimeSlot] = await com.pool.query('select * from training_schedule_time_slots where id = ?',[findStudentTimeSlots[j].training_schedule_time_slot_id]);

    //     if(!findScheduleTimeSlot)throw new AppError('Failed to find schedule time slot',500);

    //     console.log('findScheduleTimeSlot',findScheduleTimeSlot);

    //     const [trainingLevel] = await com.pool.query('select title_level from training_level where id = ?',[findScheduleTimeSlot[0].training_level_id]);

    //     if(!trainingLevel)throw new AppError('Failed to find training level',500);

    //     console.log('trainingLevel',trainingLevel);

    //     scheduleData.push(findScheduleTimeSlot[0]);

    //     scheduleData[j].title_level = trainingLevel[0].title_level;

    //     const [trainingDay] = await com.pool.query('select day from training_schedule_days where id = ?',[findScheduleTimeSlot[0].training_schedule_days_id]);

    //     if(!trainingDay)throw new AppError('Failed to find training day',500); 

    //     console.log('trainingDay',trainingDay);

    //     scheduleData[j].day = trainingDay[0].day;
    // }



    // return {findStudent,scheduleData};

    const [findStudent] = await com.pool.query(
        `SELECT 
        ats.name,
        ats.gender,
        ats.age,
        ats.phone,
        ats.email,
        ats.payment_image_url,

        tp.category_card_image_url AS category_card_image_url,

        tsts.id,
        tsts.trainning_program_id,
        tsts.training_schedule_days_id,
        tsts.start_time,
        tsts.end_time,
        tsts.create_at,
        tsts.training_level_id,

        tl.title_level,
        tsd.day

    FROM admin_training_students ats

    LEFT JOIN admin_training_student_time_slots atsts
        ON ats.id = atsts.admin_training_students_id

    LEFT JOIN training_program tp
        ON ats.training_program_id = tp.id

    LEFT JOIN training_schedule_time_slots tsts
        ON atsts.training_schedule_time_slot_id = tsts.id

    LEFT JOIN training_level tl
        ON tsts.training_level_id = tl.id

    LEFT JOIN training_schedule_days tsd
        ON tsts.training_schedule_days_id = tsd.id

    WHERE ats.id = ?`
, [training_student_id]);

if(findStudent.length === 0){
    throw new AppError('Failed to find student',500);
}

const studentInfo = {
    name: findStudent[0].name,
    gender: findStudent[0].gender,
    age: findStudent[0].age,
    phone: findStudent[0].phone,
    email: findStudent[0].email,
    payment_image_url: findStudent[0].payment_image_url,
    category_card_image_url: findStudent[0].category_card_image_url
};

const scheduleData = findStudent.map(item => ({
    id: item.id,
    trainning_program_id: item.trainning_program_id,
    training_schedule_days_id: item.training_schedule_days_id,
    start_time: item.start_time,
    end_time: item.end_time,
    create_at: item.create_at,
    training_level_id: item.training_level_id,
    title_level: item.title_level,
    day: item.day
}));

return {
    studentInfo,
    scheduleData
};
}


exports.ShowTrainingStudentAll = async () => {

    const [rows] = await com.pool.query(
        `SELECT 
            ats.id,
            ats.name,
            ats.gender,
            ats.age,
            ats.phone,
            ats.email,
            ats.payment_image_url,

            tp.course_name,

            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', tsts.id,
                     'training_program_id', ats.training_program_id,
                    'training_schedule_days_id', tsts.training_schedule_days_id,
                    'start_time', tsts.start_time,
                    'end_time', tsts.end_time,
                    'create_at', tsts.create_at,
                    'training_level_id', tsts.training_level_id,
                    'title_level', tl.title_level,
                    'day', tsd.day
                )
            ) AS scheduleData

        FROM admin_training_students ats

        LEFT JOIN admin_training_student_time_slots atsts
            ON ats.id = atsts.admin_training_students_id

        LEFT JOIN training_schedule_time_slots tsts
            ON atsts.training_schedule_time_slot_id = tsts.id

        LEFT JOIN training_program tp
            ON ats.training_program_id = tp.id

        LEFT JOIN training_level tl
            ON tsts.training_level_id = tl.id

        LEFT JOIN training_schedule_days tsd
            ON tsts.training_schedule_days_id = tsd.id

        GROUP BY ats.id`
    );

    if (!rows.length) {
        throw new AppError('Failed to find student', 500);
    }

    return rows.map(row => ({
        studentInfo: {
            id: row.id,
            name: row.name,
            gender: row.gender,
            age: row.age,
            phone: row.phone,
            email: row.email,
            payment_image_url: row.payment_image_url,
            course_name: row.course_name
        },
        scheduleData: row.scheduleData
    }));
};


exports.DeleteTrainingStudent = async (id)=>{

    const [result] = await com.pool.query('delete from admin_training_students where id = ?',[id]);

    if(result.affectedRows === 0)throw new AppError('No data found with that id',500);

    return true;

}