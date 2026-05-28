const repo = require('./course.repositories');


class CourseService{

    async TrainingProgram(
        category_card_file,
    learning_file,learning_description,main_title,
    title,about_title,details,title_level,about_level,
    price,start_time,end_time,day_id,coach_file,
    instructor_name,biography,course_id){

    const result = await repo.TrainingProgram(category_card_file,
    learning_file,learning_description,main_title,
    title,about_title,details,title_level,about_level,
    price,start_time,end_time,day_id,coach_file,
    instructor_name,biography,course_id);

    return result;

    }

    async AddDayTimeTraining(training_program_id,training_schedule_days_id,start_time,end_time,training_level_id){

        const result = await repo.AddDayTimeTraining(training_program_id,training_schedule_days_id,start_time,end_time,training_level_id);

        return result;

    }

    async AddTrainingLevel(training_program_id,description,title_level,price){

        const result = await repo.AddTrainingLevel(training_program_id,description,title_level,price);

        return result;

    }

    async ShowTraining(){

        const result = await repo.ShowTraining();

        return result;

    }

    async AddTrainingStudent(name,gender,age,phone,email,payment_id,training_program_id,training_level_id,file){

        const result = await repo.AddTrainingStudent(name,gender,age,phone,email,payment_id,training_program_id,training_level_id,file);

        return result;

    }

    async ShowTrainingStudentAll(){

        const result = await repo.ShowTrainingStudentAll();

        return result;

    }

    async DeleteTrainingStudent(id){

        const result = await repo.DeleteTrainingStudent(id);

        return result;

    }

}

module.exports = new CourseService();