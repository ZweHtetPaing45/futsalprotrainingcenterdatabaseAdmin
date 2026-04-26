const AppError = require("../utils/AppError");
const logger = require("../utils/logger");
const util = require('../utils/tokengenerate');
const repo = require('../features/auth/auth.repositories');

exports.authMiddle =async (req,res,next)=>{

    try{

        const header = req.headers.authorization;

        if(!header)throw new AppError('Unauthorized',500);

        const token = header.split(' ')[1];

        if(!token)throw new AppError('Unauthorized',500);

        const decoded = util.verifyToken(token);

        if(!decoded)throw new AppError('Unauthorized',500);

        const admin = await repo.findEmailData(decoded.email);

        console.log("admin",admin);

        if(!admin)throw new AppError('Unauthorized',500);

        req.admin = admin;

        next();

    }catch(error){
        logger.error({
            message: error.message,
            stack: error.stack
        });
        next(error);
    }

}