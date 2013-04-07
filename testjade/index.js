//create an app server
var express = require('express')
app = express();
//set path to the views (template) directory
app.set('views', __dirname + '/views');
//set path to static files
app.use(express.static(__dirname + '/../public'));
app.use("/static/css", express.static(__dirname + '/static/css'))
//handle GET requests on /
app.get('/', function(req, res){res.render('layoutz.jade', {title: 'test'});});
app.get('/upload', function(req, res){res.render('uploadLayout.jade', {title: 'test'});});
app.get('/url', function(req, res){res.render('urlLayout.jade', {title: 'test'});});

//listen on localhost:3000
app.listen(3000);