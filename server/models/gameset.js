const mongoose = require('mongoose');

var Gameset = mongoose.Schema({
	question: {
		type: String, 
		require: [true, "Missing question"]
	},
	answer: {
		type: String, 
		require: [true, "Missing answer"]
	}, 
	gametype: {
		type: String, 
		require: [true, "Missing type"]
	}
});

var Gameset = module.exports = mongoose.model('Gameset', Gameset);

module.exports.getAllQuestions = function(callback){
	Gameset.find({}, callback);
}

module.exports.getSpecificQuestions = function (type, callback) {
	Gameset.find(type, callback);
}

module.exports.addQuestion = function (newQuestion, callback) {
	newQuestion.save(callback);
}