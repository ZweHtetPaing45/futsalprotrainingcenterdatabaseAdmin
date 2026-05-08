const router = require('express').Router();
const controller = require('./booking.controller');

router.post('/addsporttype',controller.addSportType);
router.post('/addcourt',controller.addCourtName);
router.post('/addstarttime',controller.addStartTime);
router.get('/showsporttype',controller.showSportType);
router.get('/showcourt',controller.showCourtName);
router.get('/showstarttime',controller.showStartTime);
router.put('/updatesporttype/:id',controller.updateSportType);
router.put('/updatecourt/:id',controller.updateCourtName);
router.put('/updatestarttime/:id',controller.updateStartTime);
router.delete('/deletesporttype/:id',controller.deleteSportType);
router.delete('/deletecourt',controller.deleteCourtName);
router.delete('/deletestarttime/:id',controller.deleteStartTime);

module.exports = router;