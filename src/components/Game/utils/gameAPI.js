import axios from "axios";

const gameAPI = {
	getSpecificQuestions: function (typeQuestion) {
		// if (typeQuestion === "Who is this?"){
			return axios.get("/api/game/getspecificquestions/" + typeQuestion);
		// }
		// else if (typeQuestion === "Which period is this from?") {
		// 	return axios.get("/api/game/getspecificquestions/whichperiodisthisfrom");
		// }
	},

	getAllQuestions: function () {
		return axios.get("/api/game/getallquestions");
	},

	addQuestion: function (questionObj) {
		return axios.post("/api/game/addquestion", questionObj);
	}

};

export default gameAPI;