var app = angular.module('app', []);

function mainController($scope, $http) {

	$scope.showForm = false;

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

	// edit an expense. work in progress.
	$scope.editExpense = function(id){
		var expense = {"kind":$scope.formEdit1, "category": $scope.formEdit2, "amount": $scope.formEdit3};
		$http.put('/api/expenses/' + id, expense)
			.success(function(data){
				$scope.formData = {};
				$('input').val('');
				$scope.expenses = data;
				// console.log(data);
			})
			.error(function(data){
				console.log('Error' + data);
			});
	};

	// delete an expense 
	$scope.deleteExpense = function(id) {
		$http.delete('/api/expenses/' + id)
			.success(function(data) {
				$scope.expenses = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
