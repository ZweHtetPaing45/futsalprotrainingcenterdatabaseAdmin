const router = require('express').Router();
const controller = require('./menus.controller');
const uploader = require('../../../middlewares/multer');

//Get Method
router.get('/showmenu',controller.showMenu);
router.get('/showmenucategory',controller.showMenuCategory);
router.get('/totalmenu',controller.ShowMenuTotal);

//Post Method
router.post('/addmenucategory',controller.addMenuCategory);
router.post('/addmenu',uploader.single('image'),controller.addMenu);

//Put Method
router.put('/updatemenucategory/:id',controller.updateMenuCategory);
router.put('/updatemenu/:id',uploader.single('image'),controller.updateMenu);

//Delete Method
router.delete('/deletemenucategory/:id',controller.deleteMenuCategory);
router.delete('/deletemenu/:id',controller.deleteMenu);

module.exports = router;