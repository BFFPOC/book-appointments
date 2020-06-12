'use strict';

const http = require('./httpserver');

http.listen('3005', function(req,res) {
    console.log('helo I am new server');
});
