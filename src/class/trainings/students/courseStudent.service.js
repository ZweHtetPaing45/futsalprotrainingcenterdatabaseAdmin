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

}

module.exports = new CourseStudentService();