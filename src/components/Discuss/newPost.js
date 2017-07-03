import React, { Component } from 'react';
import API from '../../utils/API';

export default class NewPost extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            category: this.props.params.category,
            title: '',
            text: '',
            date: '',
            userId: null,
            username: null
        }
        // Get the current date and time
        var date = new Date();
        this.state.date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " @ " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        if (this.props.loginStatus == true) {
            this.state.userId = localStorage.getItem('userId');
            this.state.username = localStorage.getItem('username');
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkLoginStatus = this.checkLoginStatus.bind(this);
    }

    /**
     * Detects when a change is made in an input field and 
     * updates the corresponding state prop
     */
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    /**
     * Submits a request to post a new user to the database.
     * If there was an error then the state is updated and the view
     * is rendered to indicate what went wrong.
     */
    handleSubmit(event) {
        event.preventDefault();

        var newPost = {
            category: this.state.category,
            title: this.state.title,
            text: this.state.text,
            date: this.state.date,
            userId: this.state.userId,
            username: this.state.username
        };

        //If the user is logged in, save a new post and then navigate to that post's route
        if (this.props.loginStatus) {
            API.newPost(newPost).then(function (response) {
                var postQuery = '/post/' + response.data._id;
                this.props.router.push({ pathname: postQuery });
            }.bind(this));
        }
    }

    /** Display an error message if the user tries to post without logging in. */
    checkLoginStatus() {
        if (!this.props.loginStatus) {
            return <p style={{ color: 'red' }}>You must be logged in to post.</p>
        }
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3>Create a new post in {this.state.category}</h3>
                    {this.checkLoginStatus()}
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Post Title</label>
                        <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Post Text</label>
                        <input type="text" className="form-control" name="text" value={this.state.text} onChange={this.handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }
}