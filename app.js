var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var routes = require('./routes/index');
var services = require('./routes/services.js');
var config = require("./config.js");
var utils = require("./utils/utils.js");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/cricket/public/", express.static(path.join(__dirname, 'public')));
app.use('/cricket', routes);
app.use('/cricket/services/', services.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  	var err = new Error('Not Found');
  	err.status = 404;
  	next(err);
});

// error handlers

function getHttpStatus(myRaised, autoRaised){
	if(myRaised==="401" || myRaised === "404"){
		return myRaised;
	}
	return autoRaised;
}

module.exports = app;