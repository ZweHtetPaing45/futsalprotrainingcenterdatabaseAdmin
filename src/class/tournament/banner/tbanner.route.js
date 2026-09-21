const router = require('express').Router();
const controller = require('./tbanner.controller');
const upload = require('../../../middlewares/multer');

router.post('/addbanner', upload.single('banner_image'), controller.addBanner);
router.get('/showbanner', controller.showBanners);
router.put('/updatebanner', upload.single('banner_image'), controller.updateBanner);
router.delete('/deletebanner/:id', controller.deleteBanner);

module.exports = router;
