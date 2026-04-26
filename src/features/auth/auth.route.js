const router = require('express').Router();
const controller = require('./auth.controller');

router.post('/adminlogin',controller.login);

module.exports = router;