const service = require('./courseStudent.service');

class CourseStudentController{

        async AddTrainingStudent(req,res,next){
    
            try{
    
                const {name,gender,age,phone,email,payment_id,training_program_id,training_level_id} = req.body;
    
                const file = req.file;
    
                if(!name || !gender || !age || !phone || !email || !training_program_id || !training_level_id){
                    throw new AppError('Please fill all the fields', 400);
                }
    
                // if(!file){
                //     throw new AppError('Please fill all the fields', 400);
                // }
    
                const result = await service.AddTrainingStudent(name,gender,age,phone,email,payment_id,training_program_id,training_level_id,file);
    
                // if(!result)throw new AppError('Failed to add training student',500);
    
                if(result){
                    return res.status(201).json({
                        success: true,
                        message: 'Training student added successfully',
                        data: result
                    });
                }else{
                    return res.status(400).json({
                        success: false,
                        message: 'Training student not added',
                        data: result
                    });
                }
    
    
    
            }catch(error){
                next(error);
            }
    
        }


          async ShowTrainingStudentAll(req,res,next){
        
                try{
        
                    const result = await service.ShowTrainingStudentAll();
        
                    if(result){
                        return res.status(201).json({
                            success: true,
                            message: 'Show Training student retrieved successfully',
                            data: result
                        });
                    }else{
                        return res.status(400).json({
                            success: false,
                            message: 'Failed to retrieve training students',
                            data: result
                        });
                    }
        
                }catch(error){
                    next(error);
                }
        
            }
        
        async TrainingStudentDetailFindId(req,res,next){

            try{

                const student_id = req.params.student_id;

                const source = req.params.source;

                const result = await service.TrainingStudentDetailFindId(student_id,source);

                if(result){
                    return res.status(201).json({
                        success: true,
                        message: 'Show Training student retrieved successfully',
                        data: result
                    });
                }else{
                    return res.status(400).json({
                        success: false,
                        message: 'Failed to retrieve training students',
                        data: result
                    });
                }

            }catch(error){
                next(error);
            }

        }

        async UpdateWarning(req,res,next){
            try{

                const id = req.params.stu_id;
                const source = req.params.source;
                let warning = req.params.warning;

                warning = warning === 'true' ? 1 : 0 ;

                // console.log(warning);

                const result = await service.UpdateWarning(id,source,warning);

                if(result){
                    return res.status(201).json({
                        success: true,
                        message: 'Warning Training student successfully',
                        data: result
                    });
                }else{
                    return res.status(400).json({
                        success: false,
                        message: 'Failed to warning training students',
                        data: result
                    });
                }
                

            }catch(error){
                next(error);
            }
        }

}

module.exports = new CourseStudentController();