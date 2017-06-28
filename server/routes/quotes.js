const express = require('express');

const router = new express.Router();
const Quote = require('../models/quote');

router.get('/api/getquotes', function (req, res){
	Quote.getQuotes(function (err, allQuotes){
		if (err) throw err; 
		console.log("get quotes", allQuotes);
		res.json({ allQuotes: allQuotes });
	});
	
});

router.post('/api/addquote', function (req, res) {
	var newQuote = new Quote({
		quote: req.body.quote,
		author: req.body.author
	})
	Quote.addQuote(newQuote, function (err, quote) {
		if (err) throw err;
		console.log("new quote added", quote); 
	});
	
});

module.exports = router;