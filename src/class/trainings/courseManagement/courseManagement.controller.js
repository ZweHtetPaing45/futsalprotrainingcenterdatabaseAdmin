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
}

module.exports = new CourseManagementController();