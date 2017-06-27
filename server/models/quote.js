const mongoose = require('mongoose');

var QuoteSchema = mongoose.Schema({
	term: {
		type: String
	}, 
	definition: {
		type: String
	}
});

var User = module.exports = mongoose.model('Quote', QuoteSchema);

module.exports.getQuotes = function(){
	Quote.findAll(callback);
}

module.exports.addQuote = function () {
	Quote.findAll(quoteObj, callback);
}