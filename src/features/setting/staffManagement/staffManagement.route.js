const router = require('express').Router();
const controller = require('./staffManagement.controller');
const {validate,addStaff} = require('../../../middlewares/joi');
// const auth = require('../../../middlewares/auth.middleware');

router.post('/newstaff',validate(addStaff),controller.NewStaff);
router.delete('/deletestaff/:id',controller.deleteStaff);
router.get('/showstaff',controller.showStaff);
module.exports = router;