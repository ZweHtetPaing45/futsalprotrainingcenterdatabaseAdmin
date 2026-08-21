const walkInController = require('./walk-in.controller');
const router = require('express').Router();
const upload = require('../../../middlewares/multer');


//Post Method
router.post('/',walkInController.addingWalkIn);
router.post('/booking',upload.single('payment_image'),walkInController.addbookingWalkIn);

//Get Method
router.get('/',walkInController.allWalkInList);
router.get('/court_list',walkInController.allCourtWalkIn);

//Patch Method
router.patch('/:walk_in_id',walkInController.updateWalkIn);

module.exports = router;