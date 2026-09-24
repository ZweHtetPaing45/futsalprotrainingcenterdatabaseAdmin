const router = require('express').Router();
const controller = require('./tmanagement.controller');
const upload = require('../../../middlewares/multer');

router.post('/addtournament', upload.single('banner_image'), controller.addTournament);
router.get('/showtournaments', controller.showTournaments);
router.get('/showtournament/:id', controller.showTournament);
router.put('/updatetournament/:id', upload.single('banner_image'), controller.updateTournament);
router.delete('/deletetournament/:id', controller.deleteTournament);

module.exports = router;
