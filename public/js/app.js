var app = angular.module('myApplication', []);

app.controller('myCtrl', function($scope, $http) {
	$scope.title = "myApplication";
	$scope.users = [];

	$scope.load = function () {
		$http.get('/api')
			.then(function(res) {
				$scope.users = res.data;
				console.log($scope.users);
			}, function(error) {
				console.log('Error: Can\'t access to API');
			});
	}

	$scope.save = function() {
		$http.post('/api', $scope.data.new)
			.then(function(res) {
				$scope.clear($scope.data.new);
				$scope.load();
			}, function(error) {
				console.log(error);
			})
	}

	$scope.delete = function(id) {
		var obj = $scope.users.find(function (obj) { return obj.id === id; });
		$http.delete('/api/' + obj['id'], { data: obj })
			.then(function(res) {
				$scope.load();
			}, function(error) {
				console.log(error);
			})
	}

	$scope.update = function(id) {
		// body...
	}

	$scope.clear = function(fields) {
		for (var field in fields) {
			fields[field] = "";
		}
	}

	$scope.load();
})