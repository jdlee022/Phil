import axios from "axios";

const API = {
    /**
     * Submits a request to post a new user to the db
     * @param user - the new user object that we want to store in db
     * @returns a promise with a response from the server telling the component
     * whether there was a validation error or if the post was a success
     */
	loadQuotes: function () {
		return axios.get("/api/loadQuotes");
	},

	addQuote: function (quoteObj) {
		return axios.post("/api/addQuote", quoteObj)
	}

};

export default API;