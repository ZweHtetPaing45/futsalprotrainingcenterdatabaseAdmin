const router = require('express').Router();
const controller = require('./courseManagement.controller');
const upload = require('../../../middlewares/multer');

//POST Method
router.post('/addcourse',upload.single('category_card_image'),controller.AddCourse);

//GET Method
router.get('/showtraining',controller.ShowTrainingImage);

//PUT Method
router.put('/updatecourse/:id',upload.single('category_card_image'),controller.UpdateTraining);

module.exports = router;