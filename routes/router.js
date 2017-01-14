var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost/videos');

var Video = mongoose.Schema({
    idv: String,
    thumbnail: Number,
    aud : String,
    title : String,
    description : String
});
var db;
var video = mongoose.model('video',Video);
video.find({}, function (err, data) {
    db = data;
});


router.get('/',function(req,res){
    res.render('Starter');
});

router.get('/videos', function (req, res) {
    res.send(db);
});

module.exports = router;