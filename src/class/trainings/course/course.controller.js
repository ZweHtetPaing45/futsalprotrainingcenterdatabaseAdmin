const service = require('./course.service');

class CourseController {


    async TrainingProgram(req,res,next){

        try{

            const file = req.files;

            // console.log(file);

            if(!file){
                throw new AppError('Please fill all the fields', 400);
            }

            if(!file.category_card_image){
                throw new AppError('Please fill all the fields', 400);
            }

            // if(!file.main_program_banner_image){
            //     throw new AppError('Please fill all the fields', 400);
            // }

            if(!file.learning_image){
                throw new AppError('Please fill all the fields', 400);
            }

            const {
                learning_description,main_title,
                title,about_title,details,title_level,about_level,
                price,start_time,end_time,day_id,
                instructor_name,biography,course_id} = req.body;

            if(!learning_description || !main_title || !title || !about_title || !details || !title_level || !about_level || !price || !start_time || !end_time || !day_id || !instructor_name || !biography || !course_id){
                throw new AppError('Please fill all the fields', 400);
            }

            console.log(file.category_card_image[0],file.learning_image[0],file.coach_file[0]);

            const result = await service.TrainingProgram(
                file.category_card_image[0],file.learning_image[0],
                learning_description,main_title,
                title,about_title,details,title_level,about_level,
                price,start_time,end_time,day_id,file.coach_file[0],
                instructor_name,biography,course_id
            );

            if(!result)throw new AppError('Failed to create training program',500);

            console.log(file);

            if(result){
                return res.status(201).json({
                    success: true,
                    message: 'Training program created successfully',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async AddDayTimeTraining(req,res,next){

        try{

            const {training_program_id,training_schedule_days_id,start_time,end_time,training_level_id} = req.body;

            if(!training_program_id || !training_schedule_days_id || !start_time || !end_time || !training_level_id){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.AddDayTimeTraining(training_program_id,training_schedule_days_id,start_time,end_time,training_level_id);

            if(!result)throw new AppError('Failed to add day time training',500);

            if(result){
                return res.status(201).json({
                    success: true,
                    message: 'Day time training added successfully',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async AddTrainingLevel(req,res,next){

        try{

            const {training_program_id,description,title_level,price} = req.body;

            if(!training_program_id || !title_level || !price || !description){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.AddTrainingLevel(training_program_id,description,title_level,price);

            if(!result)throw new AppError('Failed to add training level',500);

            if(result){
                return res.status(201).json({
                    success: true,
                    message: 'Training level added successfully',
                    data: result
                });
            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Training level not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

       async ShowTraining(req,res,next){

        try{

            const id = req.params.id;

            const result = await service.ShowTraining(id);

            res.status(200).json({
                success: true,
                message: 'Training programs retrieved successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }


    async DeleteTrainingStudent(req,res,next){

        try{

            const id = req.params.id;

            const source = req.params.source;

            console.log(source);

            const result = await service.DeleteTrainingStudent(id,source);

            if(result){
                return res.status(201).json({
                    success: true,
                    message: 'Training student deleted successfully',
                    data: result
                });
            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Training student not deleted',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async ShowDays(req,res,next){

        try{

            const result = await service.ShowDays();

            res.status(200).json({
                success: true,
                message: 'Days retrieved successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async DeleteTrainingLevel(req,res,next){

        try{

            const id = req.params.id;

            const result = await service.DeleteTrainingLevel(id);

            if(result){
                return res.status(201).json({
                    success: true,
                    message: 'Training level deleted successfully',
                    data: result
                });
            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Training level not deleted',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async DeleteTrainingSchedule(req,res,next){

        try{

            const id = req.params.id;

            const result = await service.DeleteTrainingSchedule(id);

            if(result){
                return res.status(201).json({
                    success: true,
                    message: 'Training schedule deleted successfully',
                    data: result
                });
            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Training schedule not deleted',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

}

module.exports = new CourseController();