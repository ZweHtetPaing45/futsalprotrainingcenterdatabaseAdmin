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

    async AddTrainingLevel(training_program_id,description,title_level,price,main_title,title,about_title,details,coach_file,instsuctor_name,biography){

        const result = await repo.AddTrainingLevel(training_program_id,description,title_level,price,main_title,title,about_title,details,coach_file,instsuctor_name,biography);

        return result;

    }

    async ShowTraining(id){

        const result = await repo.ShowTraining(id);

        return result;

    }



    async DeleteTrainingStudent(id,source){

        const result = await repo.DeleteTrainingStudent(id,source);

        return result;

    }

    async ShowDays(){

        const result = await repo.ShowDays();

        return result;

    }

    async DeleteTrainingLevel(level_id){
    
        const result = await repo.DeleteTrainingLevel(level_id);

        return result;
    
    }

    async DeleteTrainingSchedule(schedule_id){
    
        const result = await repo.DeleteTrainingSchedule(schedule_id);

        return result;
    
    }

    async DeleteTrainingProgram(program_id){

        const result = await repo.DeleteTrainingProgram(program_id);

        return result;

    }

    async UpdateTrainingProgramTimeSlot(schedule_id,start_time,end_time){
        
        const result = await repo.UpdateTrainingProgramTimeSlot(schedule_id,start_time,end_time);

        return result;

    }

    async UpdateTrainingLevelOptionalActive(level_id,active){

        const result = await repo.UpdateTrainingLevelOptionalActive(level_id,active);

        return result;

    }

    async GetTrainingLevelAndCourse(program_id){
        
        const result = await repo.GetTrainingLevelAndCourse(program_id);

        return result;

    }

}

module.exports = new CourseService();