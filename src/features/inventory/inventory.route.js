const controller = require('./inventory.controller');
const router = require('express').Router();
const auth = require('../../middlewares/auth.middleware');

router.get('/showinventory',auth.authMiddle,controller.showInventory);
router.delete('/deleteproduct/:id',auth.authMiddle,controller.deleteInventory);

module.exports = router;