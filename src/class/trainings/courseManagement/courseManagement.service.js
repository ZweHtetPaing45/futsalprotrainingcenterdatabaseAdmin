const repo = require('./courseManagement.repositories');


class CourseManagementServices{

    async AddCourse(course_name,file){

        const result = await repo.AddCourse(course_name,file);

        return result;

    }

    async ShowTrainingImage(){

        const result = await repo.ShowTrainingImage();

        return result;

    }

    async UpdateTraining(id,course_name,file){

        const result = await repo.UpdateTraining(id,course_name,file);

        return result;

    }

    async UpdateTrainingProgram(
        training_program_id,
        category_file,main_program_file,
        learning_file,learning_description,
        main_title,title,about_title,details,
        course_name){

            const result = await repo.UpdateTrainingProgram(
                training_program_id,
                category_file,main_program_file,
                learning_file,learning_description,
                main_title,title,about_title,details,
                course_name);

            return result;
    }

    async UpdateTrainingCoach(
        training_coach_id,
        coach_file,
        instructor_name,
        biography
    ){

        const result = await repo.UpdateTrainingCoach(
            training_coach_id,
            coach_file,
            instructor_name,
            biography
        );

        return result;

    }

}

module.exports = new CourseManagementServices();