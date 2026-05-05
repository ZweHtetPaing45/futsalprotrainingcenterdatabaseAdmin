const service = require('./auth.services');

class AdminAuthController {


    async login(req,res,next){
        try{

            const {email,password} = req.body;

            if(!email || !password){
                return res.status(400).json({message:"Email and password are required"});
            }

            const token = await service.login(email,password);

            if(!token){
                return res.status(401).json({message:"Invalid email or password"});
            }

            res.status(200).json({
                message: 'Login successful',
                token: token
            });

        }catch(error){
            next(error);
        }
    }
}

module.exports = new AdminAuthController();