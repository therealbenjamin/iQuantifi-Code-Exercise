var Expense = require('./models/expense');

module.exports = function(app) {

	// api
	// get all expenses
	app.get('/api/expenses', function(req, res) {

		// use mongoose to get all expenses in the database
		Expense.find(function(err, expenses) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(expenses); // return all expenses in JSON format
		});
	});

	// create expense and send back all expenses after creation
	app.post('/api/expenses', function(req, res) {
		console.log(req.body);

		Expense.create({
			kind: req.body.kind,
			category: req.body.category,
			amount: req.body.amount
		}, function(err, expense) {
			if (err)
				res.send(err);

			// get and return all the expenses after you create another
			Expense.find(function(err, expenses) {
				if (err)
					res.send(err);
				res.json(expenses);
			});
		});
	});

	// edit an expense
	app.put('/api/expenses/:expense_id', function(req, res){
		Expense.findById(req.params.expense_id, function(err, result) {
			console.log(req.body);
			if(err) console.log(err);
		});
	});

	// delete an expense
	app.delete('/api/expenses/:expense_id', function(req, res) {
		Expense.remove({
			_id : req.params.expense_id
		}, function(err, expense) {
			if (err)
				res.send(err);

			// get and return all the expenses after you create another
			Expense.find(function(err, expenses) {
				if (err)
					res.send(err)
				res.json(expenses);
			});
		});
	});

	// application
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};
