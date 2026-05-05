const router = require('express').Router();
const controller = require('./generalSetting.controller');
// const auth = require('../../../middlewares/auth.middleware');
const uploader = require('../../../middlewares/multer');

router.post('/addgeneral',uploader.single('logo'),controller.addgeneralSetting);
router.get('/showgeneral',controller.showgeneralSetting);
router.put('/updategeneral',uploader.single('logo'),controller.updategeneralSetting);

module.exports = router;