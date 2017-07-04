/**
 * @file contains the schema for our users that are stored in mongodb
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        //The ObjectIds will refer to ids in the Post model
        ref: "Post"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    highScore: {
        type: Number, 
		default: 0
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

/**
 * Called in user-routes.js to save a new user in the database when 
 * a post has been made and validation has been checked
 */
module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

/**
 * Finds and returns one user from the database based on the username
 * Used to check for duplicate usernames in registration
 */
module.exports.getUserByUsername = function (username, callback) {
	var query = { username: username };
	User.findOne(query, callback);
}

/**
 * Finds and returns a user from the database based on id
 */
module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
}

/**
 * Used in login to check if the entered password matches the hash
 * stored in the db for the user.
 */
module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
	});
}
