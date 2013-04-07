function connectionController($scope){
    var connections = [];
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    $scope.random_id = "";
    var appendedChunks = "";
    $scope.percentDone = 0; // between 0 and 1
    for (var i = 0;i < 16;i++) {
	$scope.random_id += chars[Math.floor(Math.random()*chars.length)];
    }

    $scope.peer = new Peer($scope.random_id, {host: 'localhost', port: 8080});

    $scope.peer.on('connection', function(conn) {
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
		sections = data.split(":");
		totalSize = sections[1];
		appendedChunks += sections[2];
		$scope.percentDone = appendedChunks.length / totalSize;
	    }
	    else if(data[0] == '3'){
		location.href = "data:application/ontect-stream," + appendedChunks;
		appendedChunks = "";
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
	    console.log(chunk.contents);
	    var conn = peer.connect(connectionId);
	    con.on('open', function(){
		conn.send("2:" + totalSize + ":" + chunk.contents);
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

var connection = {}
new connectionController(connection);

function pushChunk(chunk){ connection.pushChunk(chunk) }
function flushChunks(name, type){ connection.flushChunks(name) }
function sendFile(data){ connection.sendFile(data) }
function getId(){ connection.getId() }


