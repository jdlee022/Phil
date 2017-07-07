const express = require('express');

const router = new express.Router();
const Gameset = require('../models/gameset');

router.get('/api/game/getallquestions', function (req, res) {
	Gameset.getAllQuestions(function (err, allQuestions) {
		if (err) throw err;
		console.log("get quotes", allQuestions);
		res.json({ allQuestions: allQuestions });
	});

});

router.get('/api/game/getspecificquestions/:type', function (req, res) {
	console.log("req.body", req.params.type);
	Gameset.getSpecificQuestions({
			gametype: req.params.type
		}, function (err, specificQuestions) {
		if (err) throw err;
		console.log("get quotes", specificQuestions);
		res.json({ specificQuestions: specificQuestions });
	});
});

router.post('/api/game/addquestion', function (req, res) {
	if (req.body.gametype === "whosaysthis"){
		var newQuestion = new Gameset({
			hint: req.body.question,
			answer: req.body.answer,
			gametype: req.body.gametype, 
			question: "Who said this?"
		});
		Gameset.addQuestion(newQuestion, function (err, question) {
			if (err) throw err;
			console.log("new quote added", question);
		});
	} else if (req.body.gametype === "whichperiodisthisfrom") {
		var newQuestion = new Gameset({
			hint: req.body.question,
			answer: req.body.answer,
			gametype: req.body.gametype,
			question: "Which period is this from?"
		});
		Gameset.addQuestion(newQuestion, function (err, question) {
			if (err) throw err;
			console.log("new quote added", question);
		});
	}
	

});

module.exports = router;