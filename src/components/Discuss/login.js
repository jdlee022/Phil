/**
 * @file - a child component of /Discuss/index.js which renders the login page.
 * Can be accessed via react-router by hitting /login. 
 * Allows users to submit login requests and will redirect them to the discussion
 * board if login succeeds, else displays error.
 * Accessed via react-router
 */
import React, { Component } from 'react';
import API from '../../utils/API';
import './style.css';

export default class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginFailed: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayLoginError = this.displayLoginError.bind(this);
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
     * Submits a request to authenticate user login info.
     * If there was an error then the state is updated and the view
     * is rendered to indicate what went wrong.
     */
    handleSubmit(event) {
        event.preventDefault();
        var component = this;
        API.userLogin({
            username: this.state.username,
            password: this.state.password,
        }).then(function (response) {
            // if login was a success then update login status state of parent
            // set local storage, and redirect to /discuss route
            if (response.data.success) {
                localStorage.setItem('loginStatus', true);
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('userId',response.data.user._id);
                this.props.updateLoginStatus(true);
                this.props.router.push({ pathname: '/discuss' });
            }
            else {
                //if login failed then change the state so that an error msg renders
                component.setState({ loginFailed: true });
            }
        }.bind(this));;
    }

    /** Returns a jsx error msg to be displayed when the state indicates */
    displayLoginError() {
        if (this.state.loginFailed) {
            return <p className="warning">Invalid login information.</p>
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-10 col-md-offset-1 text-center login-container">
                    <h2 className="page-header">Account Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        {this.displayLoginError()}
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control form-input" name="username" value={this.state.username} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control form-input" name="password" value={this.state.password} onChange={this.handleInputChange} />
                        </div>
                        <button type="submit" className="btn -default">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}