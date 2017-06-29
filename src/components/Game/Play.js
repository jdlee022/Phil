import React, { Component } from 'react';
// import  {Link} from 'react-router'
import Stage from './children/Stage';
import Control from './children/Control';

import './style.css';

export default class Game extends Component {
	constructor(){
		super();
		this.state ={
			score: 0, 
			//can be "start" or "reset"
			playing: false
		}
		this.handleScore = this.handleScore.bind(this);
		this.handleControlBtn = this.handleControlBtn.bind(this);
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

	handleControlBtn(playingBoolean){
		this.setState({
			playing: playingBoolean
		});
	}

	render() {
		return (
			<div className="">

				<div className="col-md-6 col-md-offset-3 text-center">
					<h1>Game</h1>
				</div>
				<div className="container">
					<Control 
						score={this.state.score}
						handleControlBtn = {this.handleControlBtn}
					/>
					<br />
					<Stage 
						handleScore={this.handleScore}
						playing = {this.state.playing}
					/>
				</div>

			</div>
		);
	}
}