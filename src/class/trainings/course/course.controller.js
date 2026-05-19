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

            if(!file.main_program_banner_image){
                throw new AppError('Please fill all the fields', 400);
            }

            if(!file.learning_image){
                throw new AppError('Please fill all the fields', 400);
            }

            const {learning_description,main_title,title,
                about_title,details,title_level,about_level,
                price,start_time,end_time,days,level_type,instructor_name,
                biography} = req.body;

            if(!learning_description || !main_title || !title || !about_title || !details || !title_level || !about_level || !price || !start_time || !end_time || !days || !level_type || !instructor_name || !biography){
                throw new AppError('Please fill all the fields', 400);
            }

            console.log(file.category_card_image[0],file.main_program_banner_image[0],file.learning_image[0],file.coach_file[0]);

            const result = await service.TrainingProgram(
                file.category_card_image[0],file.main_program_banner_image[0],file.learning_image[0],
                learning_description,main_title,
                title,about_title,details,title_level,about_level,
                price,start_time,end_time,days,level_type,file.coach_file[0],
                instructor_name,biography
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


}

module.exports = new CourseController();