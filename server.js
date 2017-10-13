// NPM Modules
var express         = require('express');
var mongoose        = require('mongoose');
var path            = require('path');
var bodyParser      = require('body-parser');
var exphbs          = require('express-handlebars');
var methodOverride  = require('method-override');
var request         = require('request');
var cheerio         = require('cheerio');

// Express
var app             = express();
var router          = express.Router();

// Paths
var mainRoute       = require('./routes/main-route.js')(app);

// Views
app.set('views', './views');
app.engine("hbs", exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set("view engine", "hbs");
app.use(express.static('public'));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Method override
app.use(methodOverride('_method'));


// Database
mongoose.connect('mongodb://localhost/news-scraper');
var db = mongoose.connection;
db.on('error', function(err) {
    console.log('Mongoose Error: ', err);
});

db.once('open', function() {
    console.log('Mongoose connection successful');
});

mongoose.Promise = Promise;

// Localhost server
var PORT = 1500;
app.listen(PORT, function() {
    console.log('App running on port', PORT);
});