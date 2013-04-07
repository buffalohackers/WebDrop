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

    $scope.sendFiles = function(files){
    	console.log(files);
		if(files.length > 0){
		    for(var i=0; i<files.length; i++) {
			var file = files[i];
			var reader = new FileReader();
			reader.onload = function(e) {
			    var fileData = {"name":file.name, "type":file.type, "contents":e.target.result};
			    displayFile(fileData.name);
			    $scope.files.push(fileData);
			    $scope.sendFile(fileData);
			    $scope.$apply();
			}
				reader.readAsText(file);
		    }
		};
    }

    $scope.upload = function(e){
		$scope.overwriteEvent(e);
		$scope.sendFiles(e.target.files);
    }

    $scope.drop = function(e){
		$scope.overwriteEvent(e);
		$scope.sendFiles(e.originalEvent.dataTransfer.files);
    }
    
    $('.file-upload').bind('change', $scope.upload);
    $('.file-drop').bind('drop', $scope.drop);
}
