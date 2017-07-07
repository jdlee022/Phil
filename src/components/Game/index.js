import React, { Component } from 'react';
import { Link } from 'react-router';

import './style.css';

export default class Discuss extends Component {

	handleLogout(){
		localStorage.setItem('loginStatus', false);
		localStorage.setItem('userId', null);
		localStorage.setItem('username', null);
	}

	loginIcon(){
		var thisUser = localStorage.getItem('userId');
		if (thisUser === null || thisUser === undefined || thisUser === "null") {
			return (
				<div className="col-xs-6 log-in-container">
					<a><Link to="/login"><i className="glyphicon glyphicon-log-in"></i>Sign In</Link></a>
				</div>
			)
		}
		else {
			return (
				<div className="col-xs-6 log-in-container">
					<a onClick={this.handleLogout} ><Link to="/game"><i className="glyphicon glyphicon-log-in"></i>Sign In</Link></a>
				</div>
			)
		}
	}

	render() {
		return (
			<div className="game-all-div">
				<div className="row game-nav-container">
					<div className="col-xs-6 add-quote-container">
						<a><Link to="/addquote"><i className="glyphicon glyphicon-plus-sign"></i>Add Question</Link></a>
					</div>
					{this.loginIcon()}
				</div>

				<div className="game-children">
					{this.props.children}
				</div>
			</div>
		);
	}
}