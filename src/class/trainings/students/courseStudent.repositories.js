const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');

exports.AddTrainingStudent = async (name,gender,age,phone,email,payment_id,training_program_id,training_level_id,file)=>{

    let image_url;
    let public_id;

    let insertTrainingStudent;
    let training_student_id;

    if(file){

        console.log('First');

        const result = await uploader.upload(file,'training_student_payment_image');

        image_url = result.image_url;
        public_id = result.public_id;

        console.log('image_url',image_url);
        console.log('public_id',public_id);

    

     [insertTrainingStudent] = await com.pool.query(`
        insert into admin_training_students (payment_id,training_program_id,training_level_id,name,gender,age,phone,email,payment_image_url,payment_public_id) values(?,?,?,?,?,?,?,?,?,?)`,[
            payment_id,training_program_id,training_level_id,name,gender,age,phone,email,image_url,public_id
        ]
        );

    if(!insertTrainingStudent)throw new AppError('Failed to add training student',500);

    training_student_id = insertTrainingStudent.insertId;

    console.log('training_student_id',training_student_id);

    }else{

        console.log('Second');

        [insertTrainingStudent] = await com.pool.query(`
        insert into admin_training_students (training_program_id,training_level_id,name,gender,age,phone,email) values(?,?,?,?,?,?,?)`,[
            training_program_id,training_level_id,name,gender,age,phone,email
        ]
        );

    if(!insertTrainingStudent)throw new AppError('Failed to add training student',500);

    training_student_id = insertTrainingStudent.insertId;

    console.log('training_student_id',training_student_id);

    }

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

    const [row2] = await com.pool.query(`
      SELECT 
    tp.course_name,

    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', ats.id,
            'name', ats.name,
            'gender', ats.gender,
            'age', ats.age,
            'phone', ats.phone,
            'email', ats.email,
            'payment_image_url', ats.payment_image_url,

            'scheduleData',
            (
                SELECT JSON_ARRAYAGG(
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
                )
                FROM mobile_training_student_time_slots atsts
                LEFT JOIN training_schedule_time_slots tsts
                    ON atsts.training_schedule_time_slot_id = tsts.id
                LEFT JOIN training_level tl
                    ON tsts.training_level_id = tl.id
                LEFT JOIN training_schedule_days tsd
                    ON tsts.training_schedule_days_id = tsd.id
                WHERE atsts.mobile_training_students_id = ats.id
            )
        )
    ) AS students

FROM mobile_training_students ats

LEFT JOIN training_program tp
    ON ats.training_program_id = tp.id

GROUP BY tp.course_name;  
        `)

    const [rows1] = await com.pool.query(
        `SELECT 
    tp.course_name,

    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', ats.id,
            'name', ats.name,
            'gender', ats.gender,
            'age', ats.age,
            'phone', ats.phone,
            'email', ats.email,
            'payment_image_url', ats.payment_image_url,

            'scheduleData',
            (
                SELECT JSON_ARRAYAGG(
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
                )
                FROM admin_training_student_time_slots atsts
                LEFT JOIN training_schedule_time_slots tsts
                    ON atsts.training_schedule_time_slot_id = tsts.id
                LEFT JOIN training_level tl
                    ON tsts.training_level_id = tl.id
                LEFT JOIN training_schedule_days tsd
                    ON tsts.training_schedule_days_id = tsd.id
                WHERE atsts.admin_training_students_id = ats.id
            )
        )
    ) AS students

FROM admin_training_students ats

LEFT JOIN training_program tp
    ON ats.training_program_id = tp.id

GROUP BY tp.course_name;
`
    );

    const [row] = await com.pool.query(
        `
        SELECT 
    course_name,
    JSON_ARRAYAGG(student_json) AS students
FROM (
    SELECT 
        tp.course_name AS course_name,

        JSON_OBJECT(
            'id', ats.id,
            'name', ats.name,
            'gender', ats.gender,
            'age', ats.age,
            'phone', ats.phone,
            'email', ats.email,
            'payment_image_url', ats.payment_image_url,

            'scheduleData',
            (
                SELECT JSON_ARRAYAGG(
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
                )
                FROM mobile_training_student_time_slots atsts
                LEFT JOIN training_schedule_time_slots tsts
                    ON atsts.training_schedule_time_slot_id = tsts.id
                LEFT JOIN training_level tl
                    ON tsts.training_level_id = tl.id
                LEFT JOIN training_schedule_days tsd
                    ON tsts.training_schedule_days_id = tsd.id
                WHERE atsts.mobile_training_students_id = ats.id
            )
        ) AS student_json

    FROM mobile_training_students ats
    LEFT JOIN training_program tp 
        ON ats.training_program_id = tp.id

    UNION ALL

    SELECT 
        tp.course_name AS course_name,

        JSON_OBJECT(
            'id', ats.id,
            'name', ats.name,
            'gender', ats.gender,
            'age', ats.age,
            'phone', ats.phone,
            'email', ats.email,
            'payment_image_url', ats.payment_image_url,

            'scheduleData',
            (
                SELECT JSON_ARRAYAGG(
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
                )
                FROM admin_training_student_time_slots atsts
                LEFT JOIN training_schedule_time_slots tsts
                    ON atsts.training_schedule_time_slot_id = tsts.id
                LEFT JOIN training_level tl
                    ON tsts.training_level_id = tl.id
                LEFT JOIN training_schedule_days tsd
                    ON tsts.training_schedule_days_id = tsd.id
                WHERE atsts.admin_training_students_id = ats.id
            )
        ) AS student_json

    FROM admin_training_students ats
    LEFT JOIN training_program tp 
        ON ats.training_program_id = tp.id
) AS all_students

GROUP BY course_name;`
    );

    if (!rows1.length) {
        throw new AppError('Failed to find student', 500);
    }

    // return rows.map(row => ({
    //     studentInfo: {
    //         id: row.id,
    //         name: row.name,
    //         gender: row.gender,
    //         age: row.age,
    //         phone: row.phone,
    //         email: row.email,
    //         payment_image_url: row.payment_image_url,
    //         course_name: row.course_name
    //     },
    //     scheduleData: row.scheduleData
    // }));

    return row;
};
