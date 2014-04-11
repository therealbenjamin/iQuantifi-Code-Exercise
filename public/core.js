var app = angular.module('app', []);

function mainController($scope, $http) {

	// $scope.$watch('createExpense', function($scope.expenses){
	// 	console.log("DERP");
	// });

	// when landing on the page, get all expenses and show them
	$http.get('/api/expenses')
		.success(function(data) {
			$scope.expenses = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createExpense = function() {
		$scope.expense = {"kind":$scope.form1, "category": $scope.form2, "amount": $scope.form3};
		$http.post('/api/expenses', $scope.expense)
			.success(function(data) {
				$scope.formData = {};
				$('input').val('');
				$scope.expenses = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a expense after checking it
	$scope.deleteExpense = function(id) {
		$http.delete('/api/expenses/' + id)
			.success(function(data) {
				$scope.expenses = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// edit an expense
	$scope.editExpense = function(id){
		$http.put('/api/expenses/' + id)
			.success(function(data){
				$scope.expenses = data;
			})
			.error(function(data){
				console.log('Error' + data);
			});
	}
}
