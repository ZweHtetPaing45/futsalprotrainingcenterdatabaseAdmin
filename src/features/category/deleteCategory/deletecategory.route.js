const router = require('express').Router();
const controller =require('./deletecategory.controller');
const {validate,deleteCategory}= require('./../../../middlewares/joi');
// const auth = require('../../../middlewares/auth.middleware');

router.delete('/deletecategory/:name',validate(deleteCategory),controller.deleteName);

module.exports = router;