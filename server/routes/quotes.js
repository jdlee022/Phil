const express = require('express');

const router = new express.Router();
const Quote = require('../models/quote');

router.get('/api/loadQuotes', function (req, res){
	Quote.getQuotes(function (err, allQuotes){
		if (err) throw err; 
		console.log("get quotes", allQuotes)
	});
});


router.post('/api/addQuote', function (req, res) {
	var newQuote = new Quote({
		term: req.body.term,
		definition: req.body.definition
	})
	Quote.addQuote(newQuote, function (err, quote) {
		if (err) throw err;
		console.log("new quote added", quote)
	});
});

module.exports = router;