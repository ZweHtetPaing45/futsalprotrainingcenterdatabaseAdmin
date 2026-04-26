const repo = require('./staffManagement.repositories');
const bcrypt = require('bcrypt');

class StaffManagementService {

    async newStaff(name,email,password,role){

        const salt = await bcrypt.genSalt(10);

        if(!salt)throw new AppError('Failed to generate salt',500);

        const hashedPassword = await bcrypt.hash(password,salt);

        if(!hashedPassword)throw new AppError('Failed to hash password',500);

        password = hashedPassword;

        const result = await repo.NewStaff(name,email,password,role);

        if(!result)throw new AppError('Failed to create new staff',500);

        return result;

    }

    async deleteStaff(id){

        const deleteStaffResult = await repo.deleteStaff(id);

        // if(!deleteStaffResult)throw new AppError('Failed to delete staff',500);

        return deleteStaffResult;

    }

    async showStaff(){
        const showStaffResult = await repo.showStaff();

        return showStaffResult;
    }

}

module.exports = new StaffManagementService();