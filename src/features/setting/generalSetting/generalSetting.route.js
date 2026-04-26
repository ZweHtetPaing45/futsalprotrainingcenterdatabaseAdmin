const router = require('express').Router();
const controller = require('./generalSetting.controller');
const auth = require('../../../middlewares/auth.middleware');
const uploader = require('../../../middlewares/multer');

router.post('/addgeneral',auth.authMiddle,uploader.single('logo'),controller.addgeneralSetting);
router.get('/showgeneral',auth.authMiddle,controller.showgeneralSetting);
router.put('/updategeneral',auth.authMiddle,uploader.single('logo'),controller.updategeneralSetting);

module.exports = router;