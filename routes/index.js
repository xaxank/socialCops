var express = require('express');
var router = express.Router();
var util = require("util");
var http = require("http");
var config = require("../config.js");
var utils = require("../utils/utils.js");


router.get('/', function(req, res, next) {
  	res.render("dashboard");
});

module.exports = router;
