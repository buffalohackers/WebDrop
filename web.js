var fs = require('fs');
var PeerServer = require('peer').PeerServer;
var server = new PeerServer({ port: 80 });

server._app.get("/", function (request, response) {
	fs.readFile('./client.html', function (err, html) {
		if (err) {
		    throw err; 
		}
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	});
});