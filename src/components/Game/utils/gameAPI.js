import axios from "axios";

const gameAPI = {

	/**
	 * High score
	 */

	getUserHighScore: function (userId){
		return axios.get("/api/game/gethighscore/" + userId );
	},

	updateUserHighScore: function(userId, highScore){
		return axios.post("/api/game/updatehighscore", {
			userId: userId, 
			highScore: highScore
		});
	}, 

	getSpecificQuestions: function (typeQuestion) {
		return axios.get("/api/game/getspecificquestions/" + typeQuestion);
		
	},

	getAllQuestions: function () {
		return axios.get("/api/game/getallquestions");
	},

	addQuestion: function (questionObj) {
		return axios.post("/api/game/addquestion", questionObj);
	}

};

export default gameAPI;