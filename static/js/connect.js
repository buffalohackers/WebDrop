var connections = [];

var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

random_id = "";

for (var i = 0;i < 16;i++) {
	random_id += chars[Math.floor(Math.random()*chars.length)];
}

var peer = new Peer(random_id, {host: 'www.buffalohackers.com', port: 80});

peer.on('connection', function(conn) {
	conn.on('data', function(data) {
		if (data[0] == '0') {
			connectionId = data.substring(1);
			connected();
			$("body").append("<br>Connected to " + connectionId);
		} else if (data[0] == '1') {
			uriContent = "data:application/octet-stream," + encodeURIComponent(data.substring(1));
			location.href = uriContent;
		}
	});
});

var link = document.location.href.split('/');
var id = link[4];

alert(id);

if (typeof(id) !== undefined && id != "") {
	alert('almost woo' + id);
	var handShake = peer.connect(id);
	handShake.on('open', function(){
		alert('woo');
		handShake.send('0' + peer.id);
	});
	handShake.on('error', function() {
		alert('error');
	});
}

function sendFile(data) {
	if (connectionId != "") {
		console.log(data.contents);
		var conn = peer.connect(connectionId);
		conn.on('open', function() {
			conn.send("1" + data.contents);
		});
	}
}

function getId() {
	return random_id;
}

$(document).ready(function() {
	$('#send').click(function() {
		sendFile($('#text').val());
	});
});

