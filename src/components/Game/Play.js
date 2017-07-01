import React, { Component } from 'react';
// import  {Link} from 'react-router'
import Stage from './children/State2';
import Control from './children/Control';

import './style.css';

export default class Game extends Component {
	constructor(){
		super();
		this.state ={
			score: 0, 
			//can be "start" or "reset"
			playing: false, 
			gametype: ""
		}
		this.handleScore = this.handleScore.bind(this);
		this.handleControlBtn = this.handleControlBtn.bind(this);
		this.handleTypeSelect = this.handleTypeSelect.bind(this);
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

	handleTypeSelect(type){
		this.setState({
			gametype: type 
		});
	}

	render() {
		return (
			<div className="">

				<div className="col-md-6 col-md-offset-3 text-center">
					<h1>Oedipus' Journey</h1>
				</div>
				<div className="container">
					<Control 
						score={this.state.score}
						handleControlBtn = {this.handleControlBtn}
						handleTypeSelect = {this.handleTypeSelect}
					/>
					<br />
					<Stage 
						handleScore={this.handleScore}
						playing = {this.state.playing}
						gametype = {this.state.gametype}
					/>
				</div>

			</div>
		);
	}
}