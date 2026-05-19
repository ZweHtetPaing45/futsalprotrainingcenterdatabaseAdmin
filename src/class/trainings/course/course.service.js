const repo = require('./course.repositories');


class CourseService{

    async TrainingProgram(
        category_card_file,main_program_banner_file,
    learning_file,learning_description,main_title,
    title,about_title,details,title_level,about_level,
    price,start_time,end_time,days,level_type,coach_file,
    instructor_name,biography){

    const result = await repo.TrainingProgram(category_card_file,main_program_banner_file,
    learning_file,learning_description,main_title,
    title,about_title,details,title_level,about_level,
    price,start_time,end_time,days,level_type,coach_file,
    instructor_name,biography);

    return result;

    }


}

module.exports = new CourseService();