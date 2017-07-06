import React, { Component } from 'react';
import { Link } from 'react-router';

import './style.css';

export default class Discuss extends Component {

	render() {
		return (
			<div className="">
				<div className="row">
					<div className="col-xs-4" id="add-quote-container">
						<Link to="/addQuote"><i className="glyphicon glyphicon-plus-sign"></i>Add Quote</Link>
						<div className="row">
							<div className="back-to-game-container">
								<Link to="/game"><i className="glyphicon glyphicon-backward"></i>Back To Game</Link>
							</div>
						</div>
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