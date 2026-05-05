const router = require('express').Router();
const controller = require('./updateProduct.controller');
const upload = require('../../../middlewares/multer');
// router.get('/showproduct/:id',controller.updateShowProduct);
// const auth = require('../../../middlewares/auth.middleware');
router.put('/updateproduct',upload.single('image'),controller.updateProduct);


module.exports = router;