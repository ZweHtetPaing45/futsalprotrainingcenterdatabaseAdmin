const router = require('express').Router();
const controller = require('./course.controller');
const upload = require('../../../middlewares/multer');

//Post Method
router.post('/trainingprogram',upload.fields([
    {name: 'category_card_image', maxCount: 1},
    {name: 'learning_image', maxCount: 1},
    {name: 'coach_file',maxCount: 1}
]),controller.TrainingProgram);

router.post('/adddaytimetraining',controller.AddDayTimeTraining);
router.post('/addtraininglevel',controller.AddTrainingLevel);
router.post('/addtrainingstudent',upload.single('payment_image'),controller.AddTrainingStudent);

//Get Method
router.get('/showtraining',controller.ShowTraining);
router.get('/showtrainingstudentall',controller.ShowTrainingStudentAll);
router.get('/showdays',controller.ShowDays);

//Delete Method
router.delete('/deletetrainingstudent/:id',controller.DeleteTrainingStudent);

module.exports = router;