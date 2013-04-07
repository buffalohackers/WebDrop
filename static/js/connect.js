
function connectionController($scope){
	(function init($scope){
		var connections = [];
		var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		$scope.random_id = "";
		var appendedChunks = "";
		for (var i = 0;i < 16;i++) {
			random_id += chars[Math.floor(Math.random()*chars.length)];
		}

		$scope.peer = new Peer(random_id, {host: 'localhost', port: 8080});

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
				else if(data[0] == '2'){
					appendedChunks += data.substring(1);	
				}
				else if(data[0] == '3'){
					location.href = "data:application/ontect-stream," + appendedChunks;
					appendedChunks = "";
				}
			});
		});

		$scope.link = document.location.href.split('/');
		$scope.id = link[4];

		if (id != "") {
			var handShake = peer.connect(id);
			handShake.on('open', function(){
				handShake.send('0' + peer.id);
			}); 
		}
	})($scope)


	$scope.pushChunk = function(chunk){
		var peer = $scope.peer;
		var connectionId = $scope.connectionId;
		if(connectionId != ""){
			console.log(chunk.contents);
			var conn = peer.connect(connectionId);
			con.on('open', function(){
				conn.send("2" + chunk.contents);

			});
		}

	}
	$scope.flushChunks = function(flush){
		var peer = $scope.peer;
		var connectionId = $scope.connectionId;
		if(connectionId != ""){
			console.log(chunk.contents);
			var conn = peer.connectionId(connectionId);
			con.on('open', function(){
				conn.send("3" + flush.contents);
			})
		}
	}

	$scope.sendFile = function(data) {
		var peer = $scope.peer;
		var connectionId = $scope.connectionId;
		if (connectionId != "") {
			console.log(data.contents);
			var conn = peer.connect(connectionId);
			conn.on('open', function() {
				conn.send("1" + data.contents);
			});
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






