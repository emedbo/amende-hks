var Participant = require('../models/participant.server.model');

exports.join = function (req, res, next) {
    Participant.findOne({email: req.body.email}, function (err, part) {

        if (err) return next(err);
        if(part ) {
            // participant exist. Send error
        }
        else{
            // Todo: finn navn og generer link.
            // Todo: Send email til participant via Agenda
            var participant = new Participant({
                email: req.body.email
            });
            participant.save(function (err, savedParticipant) {
                if (err) return next(err);
                console.log('success');
                res.send(savedParticipant);
            });
        }
    });
};