function MainController($scope){
    $scope.files = [];

    $scope.drop = function(e){
	e.originalEvent.stopPropagation();
	e.originalEvent.preventDefault();
	e.originalEvent.dataTransfer.dropEffect = 'copy';
	var files = e.originalEvent.dataTransfer.files;
	if(files.length > 0){
	    for(var i=0; i<files.length; i++){
		var file = files[i];
		var reader = new FileReader();
		reader.onload = function(e){
		    $scope.files.push({"name":file.name, "type":file.type, "contents":e.target.result})
		    $scope.$apply();
		}
		reader.readAsText(file);
	    }
	};
    }

    $('.drag-box').bind('drop', $scope.drop)
}
