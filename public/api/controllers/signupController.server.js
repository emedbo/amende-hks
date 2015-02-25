var Participant = require('../models/participant.server.model');
var agenda = require('../utils/agenda');
var utils = require('../utils/utils');

exports.join = function (req, res, next) {
    Participant.findOne({email: req.body.email}, function (err, part) {

        if (err) return next(err);
        if (part == 1) {
            res.status(400).send('Du er allerede med! Bruk denne adressen for å logge på: ' + part.link)
        }
        else {
            var email = req.body.email;
            var name = extractNameFromEmail(email);

            var unique = utils.makeid();
            var link = 'http://' + req.get('host') + '/join/' + unique;

            var participant = new Participant({
                email: email,
                name: name,
                link: link
            });
            participant.save(function (err, savedParticipant) {
                if (err) return next(err);
                agenda.sendJoinEmail(savedParticipant._id);
                res.send(savedParticipant);
            });
        }
    });
};

function extractNameFromEmail(email) {
    var nameArr = email.split("@")[0].split(".");
    nameArr = utils.capitalizeFirstLetter(nameArr);
    return nameArr.join(" ");
}