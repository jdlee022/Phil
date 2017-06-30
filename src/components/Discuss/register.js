/**
 * @file manages the register component which acts as the sign up page for users.
 * It submits post requests to the database and will render error warnings if 
 * there was an issue with validation.
 * 
 * Date: 6/26/17
 */
import React, { Component } from 'react';
import API from '../../utils/API';

import './style.css';

export default class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkError = this.checkError.bind(this);
        this.displayDuplicateError = this.displayDuplicateError.bind(this);
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
        var newUser = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            duplicateError: false
        };
        var component = this;
        API.checkDuplicateUsername(newUser.username).then(function (response) {
            if (typeof response.data.user != undefined) {
                component.setState({duplicateError: true});
            }
            else {
                console.log("valid username, adding new user");
                API.postUser(newUser).then(function (response) {
                    component.setState({
                        errors: response.data.errors
                    });
                    if (response.data.success) {
                        //If register was a success then redirect to login page
                        component.props.router.push('/login');
                    }
                }.bind(this));;
            }
        });
    }

    /**
     * Check the state to see if there is an error for a particular input field.
     * If so, then return a jsx element to display the error.
     * (function called below each label in render())
     * @param input - the input field we are checking for an error
     */
    checkError(input) {
        for (var i in this.state.errors) {
            if (this.state.errors[i].param === input) {
                return <p style={{ 'color': 'red' }}>*{this.state.errors[i].msg}*</p>;
            }
        }
        return false;
    }

    /**
     * If the user attempted to register with a username that is already
     * in our database then render an error message
     */
    displayDuplicateError(){
        if(this.state.duplicateError){
            console.log("inside displayLoginError");
            return <p style={{ color: 'red' }}>Username already exists.</p>
        }
    }

    render() {
        return (
            <div className="">
                <div className="col-md-6 col-md-offset-3 text-center">
                    <h2 className="page-header">Register</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            {this.checkError("name")}
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            {this.checkError("username")}
                            {this.displayDuplicateError()}
                            <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            {this.checkError("email")}
                            <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            {this.checkError("password")}
                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            {this.checkError("password2")}
                            <input type="password" className="form-control" name="password2" value={this.state.password2} onChange={this.handleInputChange} />
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}