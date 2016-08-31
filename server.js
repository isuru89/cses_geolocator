
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var methodOverride = require('method-override');

var configs     = require('./config/db');

var port = process.env.PORT || 9090;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require('./app/routes')(app, configs);

app.listen(port, function () {
    console.log("geolocator is up and running in port: " + port);
});

module.exports = app;