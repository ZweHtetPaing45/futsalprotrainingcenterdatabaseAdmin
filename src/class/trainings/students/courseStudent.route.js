const router = require('express').Router();
const controller = require('./courseStudent.controller');
const upload = require('../../../middlewares/multer');


//POST Method
router.post('/addtrainingstudent',upload.single('payment_image'),controller.AddTrainingStudent);

//GET Method
router.get('/showtrainingstudentall',controller.ShowTrainingStudentAll);

module.exports = router;