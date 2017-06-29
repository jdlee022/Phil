/**
 * @file handles the server side routing related to users.
 * Receives requests from the client side via axios and directly communicates with mongoDB
 */
const express = require('express');
const router = new express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Checks for valid user input, posts user to db, and sends a response back through axios
router.post('/api/register', function (req, res) {
	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.json({ errors: errors });
	} else {
		var newUser = new User({
			name: req.body.name,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		});

		User.createUser(newUser, function (err, user) {
			if (err) throw err;
			console.log("new user added: ", user);
		});
		res.json({ success: true });
	}
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}
));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

/**
 * Check if the posted login info is valid and return a 
 * response via axios to indicate success or error
 */
router.post('/login', function (req, res, next) {

	passport.authenticate('local', function (err, user, info) {
		if (err) { return next(err); }
		if (!user) { return res.json({ error: "Invalid login info." }); }
		req.logIn(user, function (err) {
			if (err) { return res.json({ user: user, error: err }); }
			return res.json({ user: req.user, success: true });
		});
	})(req, res, next);
});

// Log the user out and tell them whether or not it was a success
router.get('/logout', function (req, res) {
	req.logout();
	res.json({ success: true });
});

module.exports = router;