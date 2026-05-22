const router = require('express').Router();
const controller =require('./venueManagement.controller');
const uploads = require('../../../middlewares/multer');

//Post Method
router.post('/addvenue',uploads.single('venue_image'),controller.NewVenue);
router.post('/addequipment',controller.NewEquipment);
router.post('/addrule',controller.NewRule);
router.post('/addservice',controller.NewService);
router.post('/addcourt',controller.NewCourt);
router.post('/addcourttime',controller.NewCourt_time_slot);
router.post('/addcourtgallery',uploads.single('court_gallery'),controller.NewCourt_gallery)
router.post('/addpros',controller.NewPros);
router.post('/addcons',controller.NewCons);


//Get Method
router.get('/showvenue',controller.ShowVenue);
// router.get('/showequipment/:id',controller.ShowEquipment);
// router.get('/showrule/:id',controller.ShowRule);
// router.get('/showservice/:id',controller.ShowService);
router.get('/showcourt/:id',controller.ShowCourt);
router.get('/remainbookingslot/:court_id/:date',controller.RemainBookingTimeSlot);
router.get('/allshowcourt',controller.AllShowCourt);

//Delete Method
router.delete('/deletevenue/:id',controller.DeleteVenue);
router.delete('/deletepros/:pro_id',controller.DeletePros);
router.delete('/deletecons/:con_id',controller.DeleteCons);
router.delete('/deletecourttimeslot/:slot_id',controller.DeleteCourtTimeSlot);
router.delete('/deleteservice/:service_id',controller.DeleteService);
router.delete('/deleterule/:rule_id',controller.DeleteRule);
router.delete('/deleteequipment/:equipment_id',controller.DeleteEquipment);


//Put Method
router.put('/activecourt/:court_id/:status',controller.UpdateCourtTrueOrFalse);
router.put('/updatevenue/:id',uploads.single('venue_image'),controller.updateVenue);

module.exports = router;