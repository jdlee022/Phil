import axios from 'axios'


var clientID = 'Mh76E8R25K';
// var secretKey = 'XUhvUz5P9ErmkBqQcK9B7a';
var setID = '215062648';
var queryString = 'https://api.quizlet.com/2.0/sets/'+ setID +'?client_id=' + clientID + '&whitespace=1'

const quizletAPI = {
	getQuotes: function(){
		return axios.get(queryString);
	}	
}

export default quizletAPI;