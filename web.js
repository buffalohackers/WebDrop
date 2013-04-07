var fs = require('fs');
var express = require('express');
var PeerServer = require('peer').PeerServer;
var server = new PeerServer({ port: 3000 });

server._app.use('/static/css', express.static(__dirname + '/static/css'));
server._app.use('/static/js', express.static(__dirname + '/static/js'));
server._app.use('/static/font', express.static(__dirname + '/static/font'));
server._app.use('/static/img', express.static(__dirname + '/static/img'));


server._app.get("/webdrop/", function (request, response) {
	fs.readFile('./templates/splash.html', function (err, html) {
		if (err) {
			throw err;
		}
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	});
});

server._app.get("/webdrop/send", function (request, response) {
	fs.readFile('./templates/url.html', function (err, html) {
		if (err) {
			throw err;
		}
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	});
});

server._app.get("/webdrop/?*", function (request, response) {
	fs.readFile('./templates/receive.html', function (err, html) {
		if (err) {
		    throw err; 
		}
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	});
});
