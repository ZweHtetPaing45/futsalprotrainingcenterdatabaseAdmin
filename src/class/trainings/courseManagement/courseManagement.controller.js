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

    async UpdateTrainingLevel(req,res,next){

        try{

            const file = req.files;

            const training_level_id = req.params.level_id;

            const {
                title_level,
                price,
                description,
                learning_description,
                main_title,
                title,
                about_title,
                details,
                instructor_name,
                biography
            } = req.body;

            console.log('file',file);
            console.log('training_level_id',training_level_id);
            console.log('title_level',title_level);
            console.log('price',price);
            console.log('description',description);
            console.log('learning_description',learning_description);
            console.log('main_title',main_title);
            console.log('title',title);
            console.log('about_title',about_title);
            console.log('details',details);
            console.log('instructor_name',instructor_name);
            console.log('biography',biography);
            // console.log('file.category_card_image[0]',file.category_card_image[0]);
            

            let UpdateTrainingProgramResult;
            let UpdateTrainingCoachResult;

            const categoryCardImage = file?.category_card_image?.[0] || null;
            const learningImage = file?.learning_image?.[0] || null;
            const coachFile = file?.coach_file?.[0] || null;

            console.log('categoryCardImage',categoryCardImage);
            console.log('learningImage',learningImage);
            console.log('coachFile',coachFile);


           const result = await service.UpdateTrainingLevel(
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

           if(result){
                res.status(200).json({
                    success: true,
                    message: 'Training level successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Training level not updated',
                    data: result
                });
            }   


        }catch(error){
            next(error);
        }

    }
}

module.exports = new CourseManagementController();