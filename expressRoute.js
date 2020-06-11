'use strict';

const express = require('express'),
    router = express.Router();
router.post('/schedule', require('./scheduleAppointment'));

module.exports = router;
