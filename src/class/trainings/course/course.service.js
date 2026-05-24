const repo = require('./course.repositories');


class CourseService{

    async TrainingProgram(
        category_card_file,main_program_banner_file,
    learning_file,learning_description,main_title,
    title,about_title,details,title_level,about_level,
    price,start_time,end_time,days,coach_file,
    instructor_name,biography){

    const result = await repo.TrainingProgram(category_card_file,main_program_banner_file,
    learning_file,learning_description,main_title,
    title,about_title,details,title_level,about_level,
    price,start_time,end_time,days,coach_file,
    instructor_name,biography);

    return result;

    }

    async AddDayTimeTraining(training_program_id,training_schedule_days_id,start_time,end_time){

        const result = await repo.AddDayTimeTraining(training_program_id,training_schedule_days_id,start_time,end_time);

        return result;

    }

    async AddTrainingLevel(training_program_id,title_level,price){

        const result = await repo.AddTrainingLevel(training_program_id,title_level,price);

        return result;

    }

}

module.exports = new CourseService();