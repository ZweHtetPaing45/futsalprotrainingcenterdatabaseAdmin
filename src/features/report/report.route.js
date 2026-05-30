const router = require('express').Router();
const controller = require('./report.controller');

router.get('/showreport',controller.ReportOverview);

module.exports = router;