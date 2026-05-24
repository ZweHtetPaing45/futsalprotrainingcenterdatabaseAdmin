const router = require('express').Router();
const controller = require('./course.controller');
const upload = require('../../../middlewares/multer');

//Post Method
router.post('/trainingprogram',upload.fields([
    {name: 'category_card_image', maxCount: 1},
    {name: 'main_program_banner_image', maxCount: 1},
    {name: 'learning_image', maxCount: 1},
    {name: 'coach_file',maxCount: 1}
]),controller.TrainingProgram);

router.post('/adddaytimetraining',controller.AddDayTimeTraining);
router.post('/addtraininglevel',controller.AddTrainingLevel);

module.exports = router;