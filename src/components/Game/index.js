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
				<div className="log-in-container">
					<a><Link to="/login"><i className="glyphicon glyphicon-log-in"></i>Login</Link></a>
				</div>
			)
		}
		else {
			return (
				<div className="log-in-container">
					<a onClick={this.handleLogout} ><Link to="/game"><i className="glyphicon glyphicon-log-in"></i>Logout</Link></a>
				</div>
			)
		}
	}

	render() {
		return (
			<div className="">
				<div className="row">
					<div className="col-xs-4" id="add-quote-container">
						<div className="add-quote-container">
							<Link to="/addquote"><i className="glyphicon glyphicon-plus-sign"></i>Add Quote</Link>
						</div>
						<div className="back-to-game-container">
							<Link to="/game"><i className="glyphicon glyphicon-backward"></i>Back To Game</Link>
						</div>
						{this.loginIcon()}
					</div>

					<div className="col-xs-8 empty">
					</div>
				</div>

				<div className="">
					{this.props.children}
				</div>
			</div>
		);
	}
}