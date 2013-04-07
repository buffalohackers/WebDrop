
function connectionController($scope){
	(function init($scope){
		var connections = [];
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		$scope.random_id = "";

		for (var i = 0;i < 16;i++) {
			random_id += chars[Math.floor(Math.random()*chars.length)];
		}

		var $scope.peer = new Peer(random_id, {host: 'www.buffalohackers.com', port: 80});

		peer.on('connection', function(conn) {
			conn.on('data', function(data) {
				if (data[0] == '0') {
					$scope.connectionId = data.substring(1);
					connected();
					$("body").append("<br>Connected to " + connectionId);
				} else if (data[0] == '1') {
					uriContent = "data:application/octet-stream," + encodeURIComponent(data.substring(1));
					location.href = uriContent;
				}
			});
		});

		var $scope.link = document.location.href.split('/');
		var $scope.id = link[4];

		if (id != "") {
			var handShake = peer.connect(id);
			handShake.on('open', function(){
				handShake.send('0' + peer.id);
			}); 
		}
	})($scope)



	$scope.sendFile = function(data) {
		var peer = $scope.peer;
		var connectionId = $scope.connectionId;
		if (connectionId != "") {
			console.log(data.contents);
			var conn = peer.connect(connectionId);
			conn.on('open', function() {
				conn.send("1" + data.contents);
			});
			if(conn == peer.connect(connectionId)){
				var hasConnected = true;
				return hasConnected;
			}

		}
	}


	$scope.getId = function() {

		return $scope.random_id;
	}

	$(document).ready(function() {
		$('#send').click(function() {
			sendFile($('#text').val());
		});
	});


}






