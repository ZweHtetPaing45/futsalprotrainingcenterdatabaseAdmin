const router = require('express').Router();
const controller = require('./staffManagement.controller');
const {validate,addStaff} = require('../../../middlewares/joi');
const auth = require('../../../middlewares/auth.middleware');

router.post('/newstaff',auth.authMiddle,validate(addStaff),controller.NewStaff);
router.delete('/deletestaff/:id',auth.authMiddle,controller.deleteStaff);
router.get('/showstaff',auth.authMiddle,controller.showStaff);
module.exports = router;