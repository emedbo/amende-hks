var Participant = require('../models/participant.server.model');
var agenda = require('../utils/agenda');
var utils = require('../utils/utils');

exports.join = function (req, res, next) {
    Participant.findOne({email: req.body.email}, function (err, part) {

        if (err) return next(err);
        if (part) {
            res.status(400).send({reason: 'AlreadySignedUp', link: part.link});
            return;
        }
        else {
            var email = req.body.email;
            var name = extractNameFromEmail(email);

            var unique = utils.makeid();
            var link = 'http://' + req.get('host') + '/legselect/' + unique;

            var participant = new Participant({
                email: email,
                name: name,
                link: link,
                partId: unique
            });
            participant.save(function (err, savedParticipant) {
                if (err) return next(err);
                agenda.sendJoinEmail(savedParticipant._id);
                res.send(savedParticipant);
            });
        }
    });
};

exports.getDataForParticipant = function (req, res, next) {
    if(!req.params.id) {
        res.sendStatus(500);
        return;
    }
    console.log(req.params.id);
    Participant.findOne({partId:req.params.id}, function (err, part) {
        if (err) return next(err);
        console.log(JSON.stringify(part));
        if(!part) {
            res.sendStatus(400);
            return;
        }
        res.send(part);
    })
};

function extractNameFromEmail(email) {
    var nameArr = email.split("@")[0].split(".");
    nameArr = utils.capitalizeFirstLetter(nameArr);
    return nameArr.join(" ");
}