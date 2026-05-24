const controller = require('./inventory.controller');
const router = require('express').Router();
// const auth = require('../../middlewares/auth.middleware');

//Get Method
router.get('/showinventory',controller.showInventory);
router.get('/totalinventory',controller.totalInventory);

//Delete Method
router.delete('/deleteproduct/:id',controller.deleteInventory);

module.exports = router;