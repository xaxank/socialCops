var express = require('express');
var config = require('../config.js');
var request = require('request');
var path = require("path");
var fs = require('fs');
var utils = require("../utils/utils.js");
var MongoClient = require('mongodb').MongoClient;


var router = express.Router();

router.post('/getbasestats', function(req,res,next){

	var query = {"opposition":"v Pakistan"};
    // console.log(query);
	MongoClient.connect(config.Mongo.Url, {native_parser:true}, function(err, db) {
    	db.collection(config.Mongo.collection).find(query).toArray(function(err,result){
    		if(err)
    			next(err);

	    	res.send(result);
	      	db.close();
    	});
  	});
});


router.post('/getvsstats', function(req,res,next){

	var query = [{ $group: { _id: {"opposition":"$opposition" , "result" : "$match_result" }, total : { $sum : 1 }  } } , { $sort : { "total" : -1 } }];
    // console.log(query);
	MongoClient.connect(config.Mongo.Url, {native_parser:true}, function(err, db) {
    	db.collection(config.Mongo.collection).aggregate(query).toArray(function(err,result){
    		if(err)
    			next(err);

            var resObj = {};

            for(i = 0; i < result.length; ++i){
                // console.log(result[i])
                var teamName = result[i]["_id"]["opposition"],
                    total = result[i]["total"],
                    WoL = result[i]["_id"]["result"];

                resObj[teamName] = resObj[teamName] || {win:0,loss:0};    

                if(WoL == 'won'){
                    resObj[teamName]["win"] = total;
                }else {
                    resObj[teamName]["loss"] = total;
                }
            }

            // console.log(resObj)

	    	res.send(resObj);
	      	db.close();
    	});
  	});
});



router.post('/getcareergraph', function(req,res,next){

    var selection = {date:1,opposition:1,match_result:1,batting_score:1}
        sort = {sort:{ date : -1 }};

    // console.log(query);
    MongoClient.connect(config.Mongo.Url, {native_parser:true}, function(err, db) {
        db.collection(config.Mongo.collection).find({},selection,sort).toArray(function(err,result){
            if(err)
                next(err);

            res.send(result);
            db.close();
        });
    });
});


module.exports = {
    router: router
};
