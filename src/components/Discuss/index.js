/**
 * @file - the main component for the discuss "page". In charge of keeping track of 
 * the login state, rendering user login links based on that state, and rendering 
 * the login, register, categories, threads, and posts components.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';

import './style.css';

export default class Discuss extends Component {

    constructor(props) {
        super(props);
        //Use local storage so that login status persists on page refresh
        var loginStatus = (typeof localStorage.getItem('loginStatus') !== 'undefined' && localStorage.getItem('loginStatus')) || 0;
        this.state = {
            loginStatus: JSON.parse(loginStatus)
        };
        this.displayUserLinks = this.displayUserLinks.bind(this);
        this.updateLoginStatus = this.updateLoginStatus.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    /** Submits a user logout request and redirects to the login page */
    handleLogout() {
        localStorage.setItem('loginStatus', false);
        localStorage.setItem('userId', null);
        localStorage.setItem('username', null);
        this.setState({ loginStatus: false });
    }

    /** Returns login, register, or logout JSX links depending on the login status  */
    displayUserLinks() {
        if (this.state.loginStatus === true) {
            return <div className="discussLinks col-md-8 col-md-offset-2 ">
                <Link to="/discuss" >Topics</Link>
                <a onClick={this.handleLogout}>Logout</a>;
            </div>
        }
        else {
            return <div className="discussLinks col-md-8 col-md-offset-2 ">
                <Link to="/discuss" >Topics</Link>
                <Link to="/login" >Login</Link>
                <Link to="/register" >Register</Link>
            </div>;
        }
    }

    /**
     * Updates the login status state of this component. This func
     * is passed as a prop to all children but only used in the login component
     * @param status - true or false depending on whether
     * a user is logging in or logging out
     */
    updateLoginStatus(status) {
        localStorage.setItem('loginStatus', status);
        this.setState({ loginStatus: status });
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.displayUserLinks()}
                </div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2" style={{ background: '#a742e3' }}>
                        {React.cloneElement(this.props.children, {loginStatus: this.state.loginStatus, updateLoginStatus: this.updateLoginStatus })}
                    </div>
                </div>
            </div>
        );
    }
}