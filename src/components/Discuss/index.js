/**
 * @file - the main component for the discuss "page". In charge of keeping track of 
 * the login state, rendering user login links based on that state, and rendering 
 * the login, register, and categories components.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import API from '../../utils/API';

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
		this.setState({ loginStatus: false });
		this.props.router.push('/login');
	}

	/** Returns login, register, or logout JSX links depending on the login status  */
	displayUserLinks() {
		console.log("inside displayUserLinks", this.state.loginStatus);
		if (this.state.loginStatus == true) {
			return <a onClick={this.handleLogout}>Logout</a>;
		}
		else {
			return <div>
				<Link to="/login" >Login </Link>
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
				<div className="discussLinks col-md-8 col-md-offset-2 text-center" >
					<Link to="/discuss">Dashboard </Link>
					{this.displayUserLinks()}
				</div>
				<div className="">
					{React.cloneElement(this.props.children, { updateLoginStatus: this.updateLoginStatus })}
				</div>
			</div>
		);
	}
}