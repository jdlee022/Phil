/**
 * @file handles the server side routing related to users.
 * Receives requests from the client side via axios and directly communicates with mongoDB
 */
const express = require('express');
const router = new express.Router();
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

module.exports = router;