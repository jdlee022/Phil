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

        if (this.props.loginStatus === true) {
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

        if (this.props.loginStatus) {
            API.newPost(newPost).then(function (response) {
                // component.setState({
                //     errors: response.data.errors
                // });
                // if (response.data.success) {
                //     //If register was a success then redirect to login page
                //     component.props.router.push('/login');
                // }
                console.log("response from newPost:", response);
            }.bind(this));;
        }
        // var newUser = {
        //     name: this.state.name,
        //     username: this.state.username,
        //     email: this.state.email,
        //     password: this.state.password,
        //     password2: this.state.password2,
        //     duplicateError: false
        // };
        // var component = this;
        // API.checkDuplicateUsername(newUser.username).then(function (response) {
        //     if (response.data) {
        //         component.setState({ duplicateError: true });
        //     }
        //     else {
        //         console.log("valid username, adding new user");
        //         API.postUser(newUser).then(function (response) {
        //             component.setState({
        //                 errors: response.data.errors
        //             });
        //             if (response.data.success) {
        //                 //If register was a success then redirect to login page
        //                 component.props.router.push('/login');
        //             }
        //         }.bind(this));;
        //     }
        // });
    }

    checkLoginStatus() {
        if (this.props.loginStatus === false) {
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