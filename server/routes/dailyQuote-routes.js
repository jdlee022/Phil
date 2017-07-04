const express = require('express');

const router = new express.Router();
const DailyQuote = require('../models/dailyQuote');

router.get('/api/home/getquotes', function (req, res) {
	DailyQuote.getQuotes(function (err, allQuotes) {
		if (err) throw err;
		console.log("get quotes", allQuotes);
		res.json({ allQuotes: allQuotes });
	});

});

router.post('/api/home/addquote', function (req, res) {
	var newQuote = new DailyQuote(req.body);
	DailyQuote.addQuote(newQuote, function (err, quote) {
		if (err) throw err;
		console.log("new quote added", quote);
	});
});

module.exports = router;