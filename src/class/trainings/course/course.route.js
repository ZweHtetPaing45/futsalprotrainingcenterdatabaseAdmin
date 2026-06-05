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


//Get Method
router.get('/showtraining/:id',controller.ShowTraining);
router.get('/showdays',controller.ShowDays);

//Delete Method
router.delete('/deletetrainingstudent/:id/:source',controller.DeleteTrainingStudent);
router.delete('/deletetraininglevel/:id',controller.DeleteTrainingLevel);
router.delete('/deletetrainingschedule/:id',controller.DeleteTrainingSchedule);
router.delete('/deletetraining/:id',controller.DeleteTrainingProgram);

//Put Method
router.put('/put_training_program_time_slot/:schedule_id',controller.UpdateTrainingProgramTimeSlot);

module.exports = router;