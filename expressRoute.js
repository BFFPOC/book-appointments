'use strict';

const express = require('express'),
    router = express.Router();
router.post('/schedule', require('./scheduleAppointment'));
router.get('/', function(req, res) {
res.status(200);
res.send("hello I am working");
});

module.exports = router;
