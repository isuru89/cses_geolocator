
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var methodOverride = require('method-override');
var expressSession = require('express-session');

var configs     = require('./config');

var port = process.env.PORT || 9090;
configs.port = port;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// secret session key. Change this to invalidate all sessions
app.use(expressSession({ secret: 'ZvH1NP40NukSy3qmEfFb9MmUlE097zhW' }));

require('./app/routes')(app, configs);

app.listen(port, function () {
    console.log("geolocator is up and running in port: " + port);
});

module.exports = app;