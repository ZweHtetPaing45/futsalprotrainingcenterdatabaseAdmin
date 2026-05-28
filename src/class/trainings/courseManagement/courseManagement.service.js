const repo = require('./courseManagement.repositories');


class CourseManagementServices{

    async AddCourse(course_name,file){

        const result = await repo.AddCourse(course_name,file);

        return result;

    }

}

module.exports = new CourseManagementServices();