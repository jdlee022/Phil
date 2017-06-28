const mongoose = require('mongoose');

var QuoteSchema = mongoose.Schema({
	quote: {
		type: String
	}, 
	author: {
		type: String
	}
});

var Quote = module.exports = mongoose.model('Quote', QuoteSchema);

module.exports.getQuotes = function(callback){
	Quote.find({}, callback);
}

module.exports.addQuote = function (newQuote, callback) {
	newQuote.save(callback);
}