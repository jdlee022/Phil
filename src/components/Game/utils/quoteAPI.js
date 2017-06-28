import axios from "axios";

const quoteAPI = {
	getQuotes: function () {
		return axios.get("/api/getquotes");
	},

	addQuote: function (quoteObj) {
		return axios.post("/api/addquote", quoteObj);
	}

};

export default quoteAPI;