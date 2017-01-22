var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


var dbURI = 'mongodb://localhost/vt';

var db = mongoose.connection;


db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error +' '+ new Date().toLocaleTimeString());
    mongoose.disconnect();
});
db.on('connected', function() {
    console.log('connected! ' + new Date().toLocaleTimeString());
});
db.once('open', function() {
    console.log('connection open ' + new Date().toLocaleTimeString());
});
db.on('reconnected', function () {
    console.log('reconnected ' + new Date().toLocaleTimeString());
});
db.on('disconnected', function () {
    console.log('disconnected ' + new Date().toLocaleTimeString());
    console.log('dbURI is: ' + dbURI);
    mongoose.connect(dbURI, {
        server: {
            auto_reconnect: true,
            socketOptions: {
                keepAlive: 1, connectTimeoutMS: 30000
            }
        },
        replset: {
            socketOptions: {
                keepAlive: 1, connectTimeoutMS: 30000
            }
        }
    });
});

mongoose.connect(dbURI, {server:{auto_reconnect:true}});

var Video = mongoose.Schema({
    idv: String,
    thumbnail: Number,
    aud : String,
    title : String,
    description : String
});
var video = mongoose.model('video',Video);


router.get('/',function(req,res){
    res.render('Starter');
});

// API
router.get('/api/videos', function (req, res) {
    video.find({}, function (err, data) {
        if (err || !data) {
            res.status(500).send({"error" : err});
        } else {
            res.status(200).send({"videos" : data, "count": data.length});
        }
    });
});

router.get('/api/video/:unid', function (req, res) {
    video.findOne({'_id': req.params.unid}, function (err, data) {
        if (err || !data) {
            res.status(500).send({"error" : err});
        } else {
            res.status(200).send({"video" : data});
        }
    });
});

module.exports = router;