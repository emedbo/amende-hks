var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Mongoose connection
var dbUri = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/hks';
mongoose.connect(dbUri);



var app = express();

var legController = require('./public/api/controllers/legController');
var signupController = require('./public/api/controllers/signupController.server');


// uncomment after placing your favicon in /public
app.set('port', process.env.PORT || 3000);
app.set('env', 'development');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();
router.route('/legs')
    .get(legController.getAllLegs);

router.route('/join')
    .post(signupController.join);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function(err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

// production error handler
// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});
//
//app.get('*', function (req, res) {
//    console.log("VIEW");
//    res.redirect('/#' + req.originalUrl);
//});

app.use('/api', router);

app.get('*', function (req, res) {
    res.redirect('/#' + req.originalUrl);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

