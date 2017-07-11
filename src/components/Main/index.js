/**
 * @file this is the parent component to all other components which also has the
 * responsibility of rendering the background image. You can see the component 
 * hierarchy in /src/index.js by looking at the routes.
 */
import React, { Component } from 'react';
import Navbar from '../Navbar/';

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