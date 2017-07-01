/** @file initializes the express app, necessary dependencies, and our routes */
require('babel-register');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
var Promise = require("bluebird");
mongoose.Promise = Promise;
//heroku db: 'mongodb://heroku_vrds24zc:n3skg2tmaquasli0cs0ta4elrq@ds139322.mlab.com:39322/heroku_vrds24zc'
//local db: 'mongodb://localhost:27017/loginapp'
mongoose.connect('mongodb://heroku_vrds24zc:n3skg2tmaquasli0cs0ta4elrq@ds139322.mlab.com:39322/heroku_vrds24zc');
const db = mongoose.connection;

const app = express();
var allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
};

app.use(allowCrossDomain);

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

// Routes
var userRoutes = require('./routes/user-routes');
var quoteRoutes = require('./routes/quotes');
var gameRoutes = require('./routes/game-routes');
var dailyQuoteRoutes = require('./routes/dailyQuote-routes');
var categoryRoutes = require('./routes/category-routes');
app.use('/', userRoutes);
app.use('/', quoteRoutes);
app.use('/', gameRoutes);
app.use('/', dailyQuoteRoutes);
app.use('/', categoryRoutes);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;