var mongoose = require('mongoose');

module.exports = mongoose.model('Expense', {
	kind: String,
	category: String,
	amount: Number
});
