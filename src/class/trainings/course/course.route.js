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
router.post('/addtraininglevel',upload.single('coach_file'),controller.AddTrainingLevel);


//Get Method
router.get('/showtraining/:id',controller.ShowTraining);
router.get('/showdays',controller.ShowDays);
router.get('/get_training_level_and_class/:program_id',controller.GetTrainingLevelAndCourse);

//Delete Method
router.delete('/deletetrainingstudent/:id/:source',controller.DeleteTrainingStudent);
router.delete('/deletetraininglevel/:id',controller.DeleteTrainingLevel);
router.delete('/deletetrainingschedule/:id',controller.DeleteTrainingSchedule);
router.delete('/deletetraining/:id',controller.DeleteTrainingProgram);

//Put Method
router.put('/put_training_program_time_slot/:schedule_id',controller.UpdateTrainingProgramTimeSlot);
router.put('/put_training_level_optional_active/:level_id/:active',controller.UpdateTrainingLevelOptionalActive);

module.exports = router;