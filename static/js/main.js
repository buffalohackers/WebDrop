DEBUG = false
if(DEBUG){
    function sendFile(file){ console.log(file) }
    function pushChunk(chunk){ console.log(chunk) }
    function flushChunks(name, type){ console.log("flushing chunk " + name + " of type " + type ) }
}

function MainController($scope){
    $scope.files = [];

    $scope.overwriteEvent = function(e){
	e.originalEvent.stopPropagation();
	e.originalEvent.preventDefault();
	e.preventDefault();
	e.stopPropagation();
    }

    $scope.sendFile = function(file){
	if(typeof(sendFile) !== 'undefined') sendFile(file);
    }

    $scope.chunkString = function(string, chunkSize){
	var chunks = [];
	for(var i=0; i<string.length; i += chunkSize){
	    chunks.push(string.substring(i,i+chunkSize));
	}
	return chunks;
    }

    $scope.sendChunks = function(chunks){
	for(var i=0; i<chunks.length; i++){
	    var chunk = chunks[i];
	    pushChunk(chunk);
	}
    }
    $scope.flushChunks = function(name, type){ flushChunks(name, type) }

    $scope.sendChunkedFile = function(file){
	var reader = new FileReader();
	reader.onload = function(e){
	    var chunks = $scope.chunkString(e.target.result, 1024);
	    $scope.sendChunks(chunks);
	    $scope.flushChunks();
	    $scope.$apply();
	}
	reader.readAsText(file);
    }

    $scope.sendFile = function(file){
	var reader = new FileReader();
	reader.onload = function(e){
	    var fileData = {"name":file.name, "type":file.type, "contents":e.target.result};
	    $scope.files.push(fileData);
	    if(typeof(sendFile) !== 'undefined') sendFile(fileData);
	    $scope.$apply();
	}
	reader.readAsText(file);
    }

    $scope.sendFiles = function(files, method){
    	console.log(files);
	if(files.length > 0){
	    for(var i=0; i<files.length; i++) {
		method(files[i]);
	    }
	}
    }

    $scope.upload = function(e){
	$scope.overwriteEvent(e);
	$scope.sendFiles(e.target.files, $scope.sendChunkedFile);
    }

    $scope.drop = function(e){
	$scope.overwriteEvent(e);
	$scope.sendFiles(e.originalEvent.dataTransfer.files, $scope.sendChunkedFile);
    }

    $('.file-upload').bind('change', $scope.upload);
    $('.file-drop').bind('drop', $scope.drop);
}
