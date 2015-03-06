var agenda = require('agenda')({db: {address: process.env.CUSTOMCONNSTR_MONGOLAB_URI ||  'localhost/hks'}});
var nodemailer = require('nodemailer');
var Participant = require('../models/participant.server.model');
var sendGridPassword = process.env.SENDGRID_PASS;

agenda.define('join email', function (job, done) {

    Participant.findById(job.attrs.data.participantId).exec(function (err, participant) {

        var smtpTransport = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {user: 'emedbo', pass: sendGridPassword}
        });

        var htmlLink = participant.link;

        var mailOptions = {
            from: 'Amendittene <noreply@amende-hks.azurewebsites.com>',
            to: participant.email,
            subject: 'Du er med!',
            html: '<h1>Klikk for å komme videre og velge etappe</h1><br /><br /><a href=\"' + htmlLink.toString() + '\">Velg etappe</a>'
        };

        smtpTransport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Message sent: ' + info.response);
            }
            smtpTransport.close();
            done();
        });
    });
});
agenda.start();

exports.sendJoinEmail = function (participantId) {
    agenda.schedule('in 2 seconds', 'join email', {
        participantId: participantId
    });
};