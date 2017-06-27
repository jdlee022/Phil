import React, { Component } from 'react';
import Navbar from '../Navbar/';

class Main extends Component {
	render() {
		return (
			<div className="App">
				<Navbar />
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Main;