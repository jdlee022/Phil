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
    },

    /**
     * Submit user login info and attempt login
     * @param loginInfo - the user's submitted info that we're checking
     * @returns a promise telling us whether or not the login was a success
     */
    userLogin: function(loginInfo) {
        return axios.post("/login", loginInfo)
    },

    /**
     * Submits a user logout request to the server
     * @returns the success status of the request
     */
    userLogout: function() {
        return axios.get('/logout');
    },

    /**
     * Checks db to see if a username has been taken
     * @param username - the username we are checking
     */
    checkDuplicateUsername: function(username) {
        return axios.get('/check/' + username);
    },

    /** Gets a user by their id */
    getUserById: function(id) {
        return axios.get('/user/' + id);
    },

    /** Gets all categories stored in the db */
    getCategories: function() {
        return axios.get('/api/categories');
    },

    /**
     * Posts a new thread to the db associated with a certain topic
     * @param postInfo - contains the object that will be submitted as 
     * a new post in post-routes.js
     */
    newPost: function(postInfo) {
        return axios.post('/api/new_post', postInfo);
    },

    /** Gets all categories stored in the db */
    getPosts: function(category) {
        return axios.get('/api/posts/' + category);
    },

    /** Gets a single post by its id */
    getPostById: function(_id) {
        return axios.get('/api/post/' + _id);
    },

    /** posts a new comment to the database */
    newComment: function(commentInfo) {
        return axios.post('/api/new_comment', commentInfo);
    },

    /** Gets an array of comments by a post's id */
    getComments: function(postId) {
        return axios.get('/api/comments/' + postId);
    },

    /** Gets a single comment by its id */
    getCommentById: function(commentId) {
        return axios.get('/api/comment/' + commentId);
    }

};

export default API;
