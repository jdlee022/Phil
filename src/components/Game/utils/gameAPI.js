import axios from "axios";

const gameAPI = {
	getSpecificQuestions: function () {
		return axios.get("/api/game/getspecificquestions");
	},

	getAllQuestions: function () {
		return axios.get("/api/game/getallquestions");
	},

	addQuestion: function (questionObj) {
		return axios.post("/api/game/addquestion", questionObj);
	}

};

export default gameAPI;