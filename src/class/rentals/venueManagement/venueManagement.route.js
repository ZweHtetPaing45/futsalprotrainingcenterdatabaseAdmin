const router = require('express').Router();
const controller =require('./venueManagement.controller');
const uploads = require('../../../middlewares/multer');


router.post('/addvenue',uploads.single('venue_image'),controller.NewVenue);
router.post('/addequipment',uploads.single('equipment_image'),controller.NewEquipment);
router.post('/addrule',controller.NewRule);
router.post('/addservice',controller.NewService);
router.post('/addcourt',controller.NewCourt);
router.post('/addcourttime',controller.NewCourt_time_slot);
router.post('/addcourtgallery',uploads.single('court_gallery'),controller.NewCourt_gallery)
router.post('/addpros',controller.NewPros);
router.post('/addcons',controller.NewCons);

router.get('/showvenue',controller.ShowVenue);
router.get('/showequipment/:id',controller.ShowEquipment);
router.get('/showrule/:id',controller.ShowRule);
router.get('/showservice/:id',controller.ShowService);
router.get('/showcourt/:id',controller.ShowCourt);

module.exports = router;