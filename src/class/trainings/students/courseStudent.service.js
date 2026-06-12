const repo = require('./courseStudent.repositories');

class CourseStudentService{


       async AddTrainingStudent(name,gender,age,phone,email,payment_id,training_program_id,training_level_id,file){
    
            const result = await repo.AddTrainingStudent(name,gender,age,phone,email,payment_id,training_program_id,training_level_id,file);
    
            return result;
    
        }



        async ShowTrainingStudentAll(){
        
                const result = await repo.ShowTrainingStudentAll();
        
                return result;
        
        }

        async TrainingStudentDetailFindId(student_id,source){

                const result = await repo.TrainingStudentDetailFindId(student_id,source);

                return result;

        }

        async UpdateWarning(id,source,warning){

                const result = await repo.UpdateWarning(id,source,warning);

                return result;

        }

}

module.exports = new CourseStudentService();