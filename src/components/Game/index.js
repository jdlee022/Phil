import React, { Component } from 'react';
import { Link } from 'react-router';

import './style.css';

export default class Discuss extends Component {

	render() {
		return (
			<div>
				<div className="" >
					<Link to="/addQuote">Add New Quote </Link>
					<Link to="/game">Play</Link>
				</div>
				<div className="">
					{this.props.children}
				</div>
			</div>
		);
	}
}