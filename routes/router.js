var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


var dbURI = 'mongodb://localhost/vt';

var db = mongoose.connection;

var options = {
    server: {
        auto_reconnect: true,
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 60000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 60000
        }
    }
};

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error +' '+ new Date().toLocaleTimeString());
    mongoose.disconnect();
});
db.on('connected', function() {
    console.log('Mongo connected! ' + new Date().toLocaleTimeString());
});
db.once('open', function() {
    console.log('Mongo connection open ' + new Date().toLocaleTimeString());
});
db.on('reconnected', function () {
    console.log('Mongo reconnected ' + new Date().toLocaleTimeString());
});
db.on('disconnected', function () {
    console.log('Mongo disconnected ' + new Date().toLocaleTimeString());
    console.log('dbURI is: ' + dbURI);
    mongoose.connect(dbURI, options);
});

mongoose.connect(dbURI, options);

var Video = mongoose.Schema({
    idv: String,
    thumbn: String,
    aud : Boolean,
    title : String,
    desc : String
});
var videos = mongoose.model('Video',Video);


router.get('/',function(req,res){
    res.render('Starter');
});

/**
 *    API
 */
router.get('/api/videos', function (req, res) {
    videos.find({}, function (err, data) {
        if (err || !data) {
            res.status(500).send({"error" : err});
        } else {
            res.status(200).send({"success": true, "videos" : data, "count": data.length});
        }
    });
});

router.get('/api/video/:unid', function (req, res) {
    videos.findOne({'_id': req.params.unid}, function (err, data) {
        if (err || !data) {
            res.status(500).send({"error" : err});
        } else {
            res.status(200).send({"success": true, "video" : data});
        }
    });
});

module.exports = router;