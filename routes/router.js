var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('Starter');
});

module.exports = router;