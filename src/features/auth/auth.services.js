const jwt = require('../../utils/tokengenerate');
const repo = require('./auth.repositories');
const bcrypt = require('bcrypt');

class AdminAuthService {


    async login(email,password){

        const userData = await repo.findEmailData(email);

        // console.log(userData);

        if(userData === null){
            return 'User not found';
        }

        if(!userData)throw new AppError('Failed to find user data',500);

        if(userData.status === 'inactive')throw new AppError('Your account is inactive. Please contact the administrator.',403);

        const isMatch = await bcrypt.compare(password,userData.password);

        if(!isMatch){
            return 'Incorrect Password';
        }

        return true;

        // const token = jwt.generateToken({email:userData.email,role_id:userData.role_id,name:userData.name});

        // if(!token)throw new AppError('Failed to generate token',500);

        // return token;
        
    }

}

module.exports = new AdminAuthService();