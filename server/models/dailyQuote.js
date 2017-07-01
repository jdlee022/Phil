const mongoose = require('mongoose');

var QuoteSchema = mongoose.Schema({
	//"A lost battle is a battle one thinks one has lost"
	quote: {
		type: String
	},
	// Jean-Paul Sartre
	philosopher: {
		type: String
	}, 
	// "XX Century"
	era: {
		type: String
	}, 
	// "Modern "
	historicPeriod: {
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