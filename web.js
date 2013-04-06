var PeerServer = require('peer').PeerServer;
var server = new PeerServer({ port: 9000 });

server.get("/", function (request, response) {
  response.simpleText(200, "Hello World!");
});