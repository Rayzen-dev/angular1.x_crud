var app = angular.module('myApplication', []);

app.controller('myCtrl', function($scope, $http) {
	$scope.title = "myApplication";
	$scope.users = [];

	$scope.load = function () {
		$http.get('/api')
			.then(function(res) {
				$scope.users = res.data;
			}, function(error) {
				console.log('Error: Can\'t access to API');
			})
	}

	$scope.save = function() {
		$http.post('/api', $scope.data.new)
			.then(function(res) {
				$scope.load();
			}, function(error) {
				console.log(error);
			})
	}

	$scope.delete = function(id) {
		console.log(id);
		/*
		$http.delete()
		*/
	}

	$scope.update = function(id) {
		// body...
	}

	$scope.load();
})