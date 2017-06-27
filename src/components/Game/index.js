import React, { Component } from 'react';

import Play from './children/Play';
import Control from './children/Control';

import './style.css';

export default class Game extends Component {
	constructor(){
		super();
		this.state ={
			score: 0, 
			//can be "start" or "reset"
			action: ""
		}
	}

	componentDidMount(){
	}

	handleScore(result){
		if (result === "true"){
			this.setState({
				score: (this.state.score + 1)
			});
		}
		console.log("update score:", this.state.score);
		
	}
	render() {
		return (
			<div className="">

				<div className="col-md-6 col-md-offset-3 text-center">
					<h1>Game</h1>
				</div>

				<div className="container">
					<Control score={this.state.score} />
					<br />
					<Play handleScore={this.handleScore.bind(this)}/>
				</div>

			</div>
		);
	}
}