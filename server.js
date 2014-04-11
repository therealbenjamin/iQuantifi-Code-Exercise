var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var port  	 = process.env.PORT || 8080;

// config
mongoose.connect('mongodb://localhost/iquantifi');

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

// routes
require('./app/routes.js')(app);

// listen
app.listen(port);
console.log("App listening on port " + port);
