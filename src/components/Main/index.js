import React, { Component } from 'react';
import Navbar from '../Navbar/';

// import Timer from "./Timer"

class Main extends Component {

	render() {
		return (
			<div className="App">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
				<Navbar/>
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Main;