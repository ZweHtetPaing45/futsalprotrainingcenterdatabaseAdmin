const controller = require('./inventory.controller');
const router = require('express').Router();

router.get('/showinventory',controller.showInventory);
router.delete('/deleteproduct/:id',controller.deleteInventory);

module.exports = router;