var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var compress = require('compression');

// Mongoose connection
var dbUri = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/hks';
mongoose.connect(dbUri);

var app = express();

var legController = require('./public/api/controllers/leg.server.controller');
var signupController = require('./public/api/controllers/signup.server.controller.js');


// uncomment after placing your favicon in /public
app.set('port', process.env.PORT || 3000);
app.set('env', 'development');
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400000 }));

var router = express.Router();
router.route('/legs')
    .get(legController.getAllLegs);

router.route('/selectedLegs')
    .get(signupController.getRegistrations);

router.route('/join')
    .post(signupController.join);

router.route('/participant/:id?')
    .get(signupController.getDataForParticipant)
    .post(signupController.saveParticipant);

app.use('/api', router);

app.get('*', function (req, res) {
    res.redirect('/#' + req.originalUrl);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

