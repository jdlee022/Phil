import axios from "axios";

const dailyQuoteAPI = {
	getQuotes: function () {
		return axios.get("/api/home/getquotes");
	},

	addQuote: function (quoteObj) {
		return axios.post("/api/home/addquote", quoteObj);
	}

};

export default dailyQuoteAPI;