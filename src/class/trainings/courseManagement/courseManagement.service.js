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

    async UpdateTrainingLevel(
                training_level_id,
                title_level,
                price,
                description,
                learning_description,
                main_title,
                title,
                about_title,
                details,
                instructor_name,
                biography,
                categoryCardImage,
                learningImage,
                coachFile
    ){
        const result = await repo.UpdateTrainingLevel(
                training_level_id,
                title_level,
                price,
                description,
                learning_description,
                main_title,
                title,
                about_title,
                details,
                instructor_name,
                biography,
                categoryCardImage,
                learningImage,
                coachFile
            );

        return result;
    }


}

module.exports = new CourseManagementServices();