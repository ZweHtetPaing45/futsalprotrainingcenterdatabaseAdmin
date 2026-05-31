const service = require('./courseManagement.service');


class CourseManagementController{

    async AddCourse(req,res,next){

        try{

            const file = req.file;
            const {course_name} = req.body;

            if(!course_name || !file){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.AddCourse(course_name,file);

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Course added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Course not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }
        
    }

    async ShowTrainingImage(req,res,next){

        try{

            const result = await service.ShowTrainingImage();

            res.status(200).json({
                success: true,
                message: 'Training images retrieved successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async UpdateTraining(req,res,next){

        try{

            const id = req.params.id;

            const {course_name} = req.body;

            const file = req.file;

            const result = await service.UpdateTraining(id,course_name,file);

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Training updated successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Training not updated',
                    data: result
                });
            }   

        }catch(error){
            next(error);
        }

    }

    async UpdateTrainingProgramAndCoach(req,res,next){

        try{

            const file = req.files;

            const {
                training_program_id,
                learning_description,
                main_title,
                title,
                about_title,
                details,
                course_name,
                training_coach_id,
                instructor_name,
                biography
            } = req.body;

            console.log('file',file);
            console.log('training_program_id',training_program_id);
            console.log('learning_description',learning_description);
            console.log('main_title',main_title);
            console.log('title',title);
            console.log('about_title',about_title);
            console.log('details',details);
            console.log('course_name',course_name);
            console.log('training_coach_id',training_coach_id);
            console.log('instructor_name',instructor_name);
            console.log('biography',biography);
            // console.log('file.category_card_image[0]',file.category_card_image[0]);
            

            let UpdateTrainingProgramResult;
            let UpdateTrainingCoachResult;

            const categoryCardImage = file?.category_card_image?.[0] || null;
            const mainProgramImage = file?.main_program_image?.[0] || null;
            const learningImage = file?.learning_image?.[0] || null;
            const coachFile = file?.coach_file?.[0] || null;

            console.log('categoryCardImage',categoryCardImage);
            console.log('mainProgramImage',mainProgramImage);
            console.log('learningImage',learningImage);
            console.log('coachFile',coachFile);

            if(training_program_id){

                console.log('first');

                UpdateTrainingProgramResult = await service.UpdateTrainingProgram(
                training_program_id,
                categoryCardImage,mainProgramImage,
                learningImage,learning_description,
                main_title,title,about_title,details,
                course_name);

            }
            
            if(training_coach_id){

                console.log('second');

                UpdateTrainingCoachResult = await service.UpdateTrainingCoach(
                training_coach_id,
                coachFile,
                instructor_name,
                biography);
            }


            if(UpdateTrainingProgramResult || UpdateTrainingCoachResult){

                res.status(200).json({
                    success: true,
                    message: 'Training program and coach updated successfully',
                    data: {UpdateTrainingProgramResult,UpdateTrainingCoachResult}
                });

            }else{

                res.status(400).json({
                    success: false,
                    message: 'Training program and coach not updated',
                    data: {UpdateTrainingProgramResult,UpdateTrainingCoachResult}
                });

            }

        }catch(error){
            next(error);
        }

    }
}

module.exports = new CourseManagementController();