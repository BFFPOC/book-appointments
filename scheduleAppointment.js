"use strict";
const rp = require('request-promise');
var jwt = require('jsonwebtoken');
const scheduleAppointments = function (req, res) {
    if (validateParms(req)) {
        let options = buildOptions(req)
        rp(options)
            .then(function (parsedBody) {
                var successObject = {
                    "statusCode": 200,
                    "Message": "Scheduled"
                }
                res.send(successObject)
                })
            .catch(function (err) {
                var errorObject = {
                    "statusCode": err.statusCode,
                    "Message": err.error.message ? err.error.message : "Some error occured with the service"
                }
                res.status(400);
                res.send(errorObject);
                });
    } else {
    var errorObject = {
        "statusCode": 400,
        "Message": "Invald Input"
    }
    res.send(errorObject);
    }
};

const buildOptions = function (req) {
    const tokenkey = req.headers.authorization;
    const token = GenarateToken(
        tokenkey,
        req.body.memberId);
    const options = {
        method: 'POST',
        uri: 'https://appointmentserviceapp-1591774967422.azurewebsites.net/schedule',
        headers: {
            "Content-Type": "application/json",
            "X-correlationid": req.get('X-correlationid')
        },
        body: {
            "memberId": req.body.memberId,
            "token": token,
            "appointmentSlot": req.body.appointmentSlot,
            "facilityId": req.body.facilityId
        },
        json: true
    };
    return options;
}

const validateParms = function (req) {
    const corelationid = req.get('X-correlationid');
    const tokenkey = req.headers.authorization;
    console.log(tokenkey + '' + corelationid);
    if ((corelationid && tokenkey && req.body.facilityId && req.body.appointmentSlot && req.body.memberId)) {
        return true;
    } else {
        return false
    }
}
const GenarateToken = function (key, memberId) {

    let genaratedToken = jwt.sign({
        token: key
    }, memberId.toString());

    return genaratedToken;

}

module.exports = scheduleAppointments;