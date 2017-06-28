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
mongoose.connect('mongodb://heroku_vrds24zc:n3skg2tmaquasli0cs0ta4elrq@ds139322.mlab.com:39322/heroku_vrds24zc');
const db = mongoose.connection;

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
    res.sendFile(__dirname, '..', 'build', 'index.html');
});

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
    errorFormatter: function (param, msg, value) {
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

// Connect Flash
app.use(flash());
// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
var userRoutes = require('./routes/users');
var quoteRoutes = require('./routes/quotes');
app.use('/', userRoutes);
app.use('/', quoteRoutes);

module.exports = app;