const router = require('express').Router();
const controller = require('./courseStudent.controller');
const upload = require('../../../middlewares/multer');


//POST Method
router.post('/addtrainingstudent',upload.single('payment_image'),controller.AddTrainingStudent);

//GET Method
router.get('/showtrainingstudentall',controller.ShowTrainingStudentAll);
router.get('/trainingstudentdetailfindid/:student_id/:source',controller.TrainingStudentDetailFindId);


//PUT Method
router.put('/training_student_waning/:stu_id/:source/:warning',controller.UpdateWarning);

module.exports = router;