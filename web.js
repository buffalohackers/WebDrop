var fs = require('fs');
var express = require('express');
var PeerServer = require('peer').PeerServer;
var server = new PeerServer({ port: 3000 });

server._app.use('/static/css', express.static(__dirname + '/static/css'));
server._app.use('/static/js', express.static(__dirname + '/static/js'));
server._app.use('/static/img', express.static(__dirname + '/static/img'));
server._app.use('/static/font', express.static(__dirname + '/static/font'));

server._app.get('/', function(req, res){res.render('layoutz.jade', {title: 'test'});});
server._app.get('/send', function(req, res){res.render('urlLayout.jade', {title: 'test'});});


server._app.get("/webdrop/?*", function (request, response) {
	fs.readFile('./templates/url.html', function (err, html) {
		if (err) {
		    throw err; 
		}
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	});
});
