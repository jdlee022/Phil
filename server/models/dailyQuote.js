const mongoose = require('mongoose');

var QuoteSchema = mongoose.Schema({
	//"A lost battle is a battle one thinks one has lost"
	quote: {
		type: String,
        required: [true, 'Missing quote'],
	},
	// Jean-Paul Sartre
	philosopher: {
		type: String,
        required: [true, 'Missing philosopher'],
	}, 
	// "XX Century"
	era: {
		type: String
	}, 
	// "Humanism "
	associatedIdeas: {
		type: String
	}
});

var DailyQuote = module.exports = mongoose.model('DailyQuote', QuoteSchema);

module.exports.getQuotes = function (callback) {
	DailyQuote.find({}, callback);
}

module.exports.addQuote = function (newQuote, callback) {
	newQuote.save(callback);
}