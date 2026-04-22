const multer = require('multer');
const AppError = require('../utils/AppError');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 30 * 1024 * 1024,
    },
    // fileFilter: (req,file,cb)=>{
    //     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    //         cb(null,true);
    //     }else{
    //         cb(new AppError('Only JPG, PNG and JPEG files are allowed'),false);
    //     }
    // }
});

module.exports = upload;