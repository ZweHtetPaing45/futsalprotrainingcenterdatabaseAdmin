const router = require('express').Router();
const controller = require('./menus.controller');
const uploader = require('../../../middlewares/multer');

router.get('/showmenu',controller.showMenu);
router.get('/showmenucategory',controller.showMenuCategory);
router.post('/addmenucategory',controller.addMenuCategory);
router.post('/addmenu',uploader.single('image'),controller.addMenu);
router.put('/updatemenucategory/:id',controller.updateMenuCategory);
router.put('/updatemenu/:id',uploader.single('image'),controller.updateMenu);
router.delete('/deletemenucategory/:id',controller.deleteMenuCategory);
router.delete('/deletemenu/:id',controller.deleteMenu);

module.exports = router;