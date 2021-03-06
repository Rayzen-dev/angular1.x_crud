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
			});
	}

	$scope.save = function() {
		if (typeof $scope.data == 'undefined' || !$scope.data.new.id || !$scope.data.new.firstname || !$scope.data.new.lastname || !$scope.data.new.email) {
			alert('Missing some informations.');
		} else {
			$http.post('/api', $scope.data.new)
				.then(function(res) {
					$scope.clear($scope.data.new);
					$scope.load();
				}, function(error) {
					console.log(error);
				})
		}
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

	$scope.editForm = function(obj, index) {
		$scope.up = obj;
		$scope.up.key = index;
	}

	$scope.update = function(obj) {
		if (typeof obj == 'undefined' || obj['id'] != '' || $obj['firstname'] != '' || obj['lastname'] != '' || obj['email'] != '') {
			$scope.load();
			alert('Missing some informations.');
		} else {
			$http.put('/api/'+obj['id'], {data: obj})
				.then(function(res) {
					$scope.clear($scope.up);
					$scope.load();
				}, function(error) {
					console.log(error);
				});
		}
	}

	$scope.clear = function(fields) {
		for (var field in fields) {
			fields[field] = "";
		}
	}

	$scope.load();
})