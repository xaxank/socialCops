var config = {};

config.Mongo = {};

config.environment = "dev";


config.Mongo.Url = 'mongodb://localhost/cricket';

// this can be switched from FE to dynamically pick collections
config.Mongo.collection = 'sachin';

config.Mongo.ReplicaSet = null;

module.exports = config;