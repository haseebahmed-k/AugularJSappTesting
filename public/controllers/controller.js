var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    console.log("hello from controler");

var refresh = function(){
	$http.get('/contactlist').then(function(response){
	    console.log("i got the data i requested");
	    document.getElementById("add").className = "btn btn-primary";
	    $scope.contactlist = response.data;
	     $scope.contact = null;
  });
}
  refresh();
$scope.addContact = function(){
	
	
	if($scope.contact != null){
		$scope.contact._id = null;
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact).then(function(response){
		console.log(response);
		refresh();
	});
	}
	
}

$scope.remove = function(id){
	console.log('reached the remove function')
	$http.delete('/contactlist/'+ id).then(function(response){
		refresh();
	});
}

$scope.edit = function(id){
	console.log('reached the edit function')
	 $http.get('/contactlist/'+id).then(function(response){
	   document.getElementById("add").className = "btn btn-primary disabled";
	    $scope.contact = response.data;
	     
  });
}

$scope.updateContact = function(){
	//console.log($scope.contact._id);
	if($scope.contact != null && $scope.contact._id != null){
		
		console.log('update contact reached update')
		$http.put('/contactlist/'+$scope.contact._id,$scope.contact).then(function(response){
		refresh();
	});
	}
	else{
	console.log('no id found to update')}
		
	
	
}
$scope.clear = function(){
	$scope.contact = null;
	document.getElementById("add").className = "btn btn-primary";
}
});
