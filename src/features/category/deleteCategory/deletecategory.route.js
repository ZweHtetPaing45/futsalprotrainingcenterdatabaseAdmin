const router = require('express').Router();
const controller =require('./deletecategory.controller');
const {validate,deleteCategory}= require('./../../../middlewares/joi');

router.delete('/deletecategory/:name',validate(deleteCategory),controller.deleteName);

module.exports = router;