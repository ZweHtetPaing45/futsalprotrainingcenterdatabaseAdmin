const router = require('express').Router();
const controller = require('./courseManagement.controller');
const upload = require('../../../middlewares/multer');

//POST Method
router.post('/addcourse',upload.single('category_card_image'),controller.AddCourse);

//GET Method
router.get('/showtraining',controller.ShowTrainingImage);

//PUT Method
router.put('/updatecourse/:id',upload.single('category_card_image'),controller.UpdateTraining);

router.put('/update_training_program_and_coach',upload.fields([
    {name: 'category_card_image', maxCount: 1},
    {name: 'learning_image', maxCount: 1},
    {name: 'main_program_image', maxCount: 1},
    {name: 'coach_file', maxCount: 1},
]),controller.UpdateTrainingProgramAndCoach);

module.exports = router;