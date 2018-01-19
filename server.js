var express = require('express'),
	http = require('http'),
	bodyParser = require('body-parser'),
	path = require('path'),
	app = express();

var users = [{id: 1, firstname: "John", lastname: "Doe", email: "john.doe@exemple.com"}];

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.get('/api', (req, res) => {
	res.json(users);
});

app.post('/api', (req, res, next) => {
	users.push(req.body);
	res.end();
})



app.get('/', (req, res) => {
	res.send('Lol');
})

http.createServer(app).listen(3000, function () {
	console.log('Express server listening on port 3000');
});