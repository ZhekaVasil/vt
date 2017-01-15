var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


var dbURI = 'mongodb://localhost/vt';

var db = mongoose.connection;


db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
db.on('connected', function() {
    console.log('connected!');
});
db.once('open', function() {
    console.log('connection open');
});
db.on('reconnected', function () {
    console.log('reconnected');
});
db.on('disconnected', function() {
    console.log('disconnected');
    console.log('dbURI is: '+dbURI);
    mongoose.connect(dbURI,
        {server: {auto_reconnect:true,
            socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }},
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }});
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

router.get('/api/videos', function (req, res) {
    video.find({}, function (err, data) {
        if (err || !data) {
            res.status(500).send();
        }
        res.status(200).send(data);
    });
});

module.exports = router;