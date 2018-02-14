var express = require('express'),
	http = require('http'),
	bodyParser = require('body-parser'),
	path = require('path'),
	app = express();

var users = [
/*
	{
		id: 1,
		firstname: "John",
		lastname: "Doe",
		email: "johndoe@exemple.com"
	},
	{
		id: 2,
		firstname: "Jane",
		lastname: "Doe",
		email: "janedoe@exemple.com"
	}
*/
];

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//	Init route for user's API
app.get('/api', (req, res) => {
	res.json(users);
});


//	Store new user to API
app.post('/api', (req, res, next) => {
	users.push(req.body);
	res.end();
})


//	Update specific user from API
app.put('/api/:userId', (req, res, next) => {
	var obj = users.find(function (obj) { return obj.id === parseInt(req.params.userId) });
	users[users.indexOf(obj)] = req.body.data;
	res.end();
});

//	Delete user from API
app.delete('/api/:userId', (req, res, next) => {
	var obj = users.find(function (obj) { return obj.id === parseInt(req.params.userId) });
	users.splice(users.indexOf(obj), 1);
	res.end();
});



// ----------------------------------------------------------------
http.createServer(app).listen(3000, function () {
	console.log('Express server listening on port 3000');
});