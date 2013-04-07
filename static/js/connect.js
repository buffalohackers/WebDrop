function connectionController($scope){
    var connections = [];
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    $scope.random_id = "";
    var appendedChunks = "";
    $scope.percentDone = 0; // between 0 and 1
    for (var i = 0;i < 16;i++) {
	$scope.random_id += chars[Math.floor(Math.random()*chars.length)];
    }

    $scope.peer = new Peer($scope.random_id, {host: 'buffalohackers.com', port: 80, serialization: "binary"});

    $scope.peer.on('connection', function(conn) {
	conn.on('data', function(data) {
	    if (data[0] == '0') {
		$scope.connectionId = data.substring(1);
		connected();
	    } else if (data[0] == '1') {
		uriContent = "data:application/octet-stream," + encodeURIComponent(data.substring(1));
		location.href = uriContent;
	    }
	    else if(data[0] == '2'){
		sections = data.split(":");
		totalSize = sections[1];
		appendedChunks += sections[2];
		//console.log(data);
		$scope.percentDone = appendedChunks.length / parseFloat(totalSize);
		if (appendedChunks.length >= totalSize) {
			location.href = "data:application/ontect-stream," + encodeURIComponent(appendedChunks);
		}
		console.log($scope.percentDone+ " " + parseFloat(totalSize) + " " + appendedChunks.length);
	    }
	    else if(data[0] == '3'){
	    	console.log("herererere");
		//location.href = "data:application/ontect-stream," + encodeURIComponent(appendedChunks);
		//appendedChunks = "";
	    }
	});
    });

    $scope.link = document.location.href.split('/');
    $scope.id = $scope.link[4];

    if ($scope.id != "" && $scope.id != 'p') {
	var handShake = $scope.peer.connect($scope.id);
	handShake.on('open', function(){
	    handShake.send('0' + $scope.peer.id);
	}); 
    }

    $scope.pushChunk = function(chunk, totalSize){
	var peer = $scope.peer;
	var connectionId = $scope.connectionId;
	if(connectionId != ""){
	    var conn = peer.connect(connectionId);
	    conn.on('open', function(){
	    	console.log(totalSize);
		conn.send("2:" + totalSize + ":" + chunk);
	    });
	}
    }

    $scope.flushChunks = function(flush_name, flush_type){
	var peer = $scope.peer;
	var connectionId = $scope.connectionId;
	if(connectionId != ""){
	    var conn = peer.connect(connectionId);
	    conn.on('open', function(){
		conn.send("3" + flush_name + ":" + flush_type);
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

var connection = {}
new connectionController(connection);

function pushChunk(chunk, total_size){ connection.pushChunk(chunk, total_size) }
function flushChunks(name, type){ connection.flushChunks(name) }
function sendFile(data){ connection.sendFile(data) }
function getId(){ connection.getId() }


