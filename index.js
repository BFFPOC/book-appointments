'use strict';

const http = require('./httpserver');
const Port = process.env.PORT || 3000

http.listen(Port, function (req, res) {
    console.log('helo I am new server');
});
