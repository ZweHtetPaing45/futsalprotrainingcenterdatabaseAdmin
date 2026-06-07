const router = require('express').Router();
const controller = require('./courseManagement.controller');
const upload = require('../../../middlewares/multer');

//POST Method
router.post('/addcourse',upload.single('main_program_image'),controller.AddCourse);

//GET Method
router.get('/showtraining',controller.ShowTrainingImage);

//PUT Method
router.put('/updatecourse/:id',upload.single('main_program_image'),controller.UpdateTraining);

router.put('/update_training_level_and_coach/:level_id',upload.fields([
    {name: 'category_card_image', maxCount: 1},
    {name: 'learning_image', maxCount: 1},
    {name: 'coach_file', maxCount: 1},
]),controller.UpdateTrainingLevel);

module.exports = router;