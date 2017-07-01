import axios from "axios";

const gameAPI = {
	getSpecificQuestions: function (typeQuestion) {
		return axios.get("/api/game/getspecificquestions", typeQuestion);
	},

	getAllQuestions: function (typeQuestion) {
		return axios.get("/api/game/getallquestions", typeQuestion);
	},

	addQuestion: function (questionObj) {
		return axios.post("/api/game/addquestion", questionObj);
	}

};

export default gameAPI;