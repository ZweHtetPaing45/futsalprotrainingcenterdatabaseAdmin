const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');


exports.ShowTrainingOverview = async ()=>{

    const [TotalTrainingStudent] = await com.pool.query(`
        SELECT 
    (SELECT COUNT(*) FROM admin_training_students) +
    (SELECT COUNT(*) FROM mobile_training_students) 
    AS total_students;
        `);

    const [total_class] = await com.pool.query('select count(*) as total_class from training_program');

    if(!total_class)throw new AppError('Failed to get total class',500);

    const [monthlyRevenue] = await com.pool.query(`
        select sum(price) as last_30 from training_level where create_at >= NOW() - interval 30 day;
        `);
    
    if(!monthlyRevenue)throw new AppError('Failed to get monthly revenue',500);

    const [new_enrollment] = await com.pool.query(`
                SELECT 
        (
            SELECT COUNT(*) 
            FROM admin_training_students
            WHERE create_at >= NOW() - INTERVAL 7 DAY
        )
        +
        (
            SELECT COUNT(*) 
            FROM mobile_training_students
            WHERE create_at >= NOW() - INTERVAL 7 DAY
        )
        AS last_7_days_students;
        `);

    if(!new_enrollment)throw new AppError('Failed to get new enrollment',500);


    //Training Enrollment
//     SELECT 
//     YEAR(all_students.create_at) AS year,
//     MONTH(all_students.create_at) AS month_num,
//     COUNT(*) AS total_students
// FROM (
//     SELECT create_at FROM admin_training_students
//     UNION ALL
//     SELECT create_at FROM mobile_training_students
// ) AS all_students
// GROUP BY 
//     YEAR(all_students.create_at),
//     MONTH(all_students.create_at)
// ORDER BY year, month_num;

    const [enrollment] = await com.pool.query(`
            SELECT 
        MONTH(all_students.create_at) AS month_num,
        MONTHNAME(all_students.create_at) AS month_name,
        COUNT(*) AS total_students
    FROM (
        SELECT create_at FROM admin_training_students
        UNION ALL
        SELECT create_at FROM mobile_training_students
    ) AS all_students
    GROUP BY 
        MONTH(all_students.create_at),
        MONTHNAME(all_students.create_at)
    ORDER BY month_num;
`);

    if(!enrollment)throw new AppError('Failed to get enrollment',500);


    const Total_students = TotalTrainingStudent[0].total_students;
    const Total_class = total_class[0].total_class;
    const Monthly_revenue = Number(monthlyRevenue[0].last_30);
    const New_enrollment = Number(new_enrollment[0].last_7_days_students);
    const Enrollment = enrollment; 

    return {
        Total_students,
        Total_class,
        Monthly_revenue,    
        New_enrollment,
        Enrollment
    };

}

exports.TrainingStudentOverview = async () => {

    const [row] = await com.pool.query(
        `
      SELECT 
    tp.course_name,
    ats.id,
    ats.name,
    tl.title_level,
    tl.price,
    DATE_FORMAT(tl.create_at, '%Y-%m-%d') AS date,
    p.payment_method,
    ats.payment_image_url,
    ats.source
FROM mobile_training_students ats
LEFT JOIN training_program tp 
    ON ats.training_program_id = tp.id
LEFT JOIN training_level tl
    ON ats.training_program_id = tl.training_program_id
LEFT JOIN payment p 
    ON ats.payment_id = p.id

UNION ALL

SELECT 
    tp.course_name,
    ats.id,
    ats.name,
    tl.title_level,
    tl.price,
    DATE_FORMAT(tl.create_at, '%Y-%m-%d') AS date,
    p.payment_method,
    ats.payment_image_url,
    ats.source
FROM admin_training_students ats
LEFT JOIN training_program tp 
    ON ats.training_program_id = tp.id
LEFT JOIN training_level tl
    ON ats.training_program_id = tl.training_program_id
LEFT JOIN payment p 
    ON ats.payment_id = p.id

ORDER BY id DESC;
        `
    )

    if (!row.length) {
        return [];
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

//     const result = row.map(course => {
//   return {
//     ...course,
//     students: course.students.sort((a, b) => b.id - a.id)
//   };
// });

    return row;
};
