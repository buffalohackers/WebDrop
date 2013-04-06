			var connections = [];

		    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		    
		    random_id = "";

		    for (var i = 0;i < 50;i++) {
		    	random_id += chars[Math.floor(Math.random()*chars.length)];
		    }

/*		    console.log("http://www.buffalohackers.com/webdrop/" + random_id);
*/
		    var peer = new Peer(random_id, {host: 'www.buffalohackers.com', port: 80});

		    peer.on('connection', function(conn) {
				conn.on('data', function(data) {
					if (data[0] == '0') {
						connectionId = data.substring(1);
						$("body").append("<br>Connected to " + connectionId);
					} else if (data[0] == '1') {
						uriContent = "data:application/octet-stream," + encodeURIComponent(data.substring(1));
						location.href = uriContent;
					}
				});
			});

			var link = document.location.href.split('/');
			var id = link[4];

			if (id != "") {
				var handShake = peer.connect(id);
				handShake.on('open', function(){
					handShake.send('0' + peer.id);
				}); 
			}

			function sendData() {
				if (connectionId != "") {
					var conn = peer.connect(connectionId);
					conn.on('open', function() {
						conn.send("1" + $('#text').val());
					});
				}
			}

			function getId() {
				return random_id;
			}

			$(document).ready(function() {
				$('#send').click(function() {
					sendData();
				});
			});
	