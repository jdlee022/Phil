/**
 * @file manages communication between the client and server via axios.
 * The functions from this API are called in react components such as register.js
 * and communicate with mongoDB
 */
import axios from "axios";

const API = {
    /**
     * Submits a request to post a new user to the db
     * @param user - the new user object that we want to store in db
     * @returns a promise with a response from the server telling the component
     * whether there was a validation error or if the post was a success
     */
  postUser: function(user) {
    return axios.post("/api/register", user);
  }
  
};

export default API;
