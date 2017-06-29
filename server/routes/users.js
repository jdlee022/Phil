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

// router.post('/login',
//     passport.authenticate('local', { successRedirect: '/login/success', failureRedirect: '/login/failure', failureFlash: true }),
//     function (req, res) {
//         console.log("req.body inside /routes/users.js", req.body);
//         res.json({test: 'it works!'});
//     }
// );

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json({user: req.user, success: true});
  });

router.get('/login/success', function(req, res){
    // Can use axios to make requests from client to server
    // but how to communicate from server to client???
    // 
});


module.exports = router;