import React, { Component } from 'react';
// import  {Link} from 'react-router'
import Stage from './children/Stage2';
import Control from './children/Control';

import gameAPI from "./utils/gameAPI"

import './style.css';

export default class Game extends Component {
	constructor(){
		super();
		this.state ={
			score: 0, 
			playing: false, 
			gametype: "mixed", 
			highScore: 0, 
			userId: ""
		}
		this.handleScore = this.handleScore.bind(this);
		this.handleControlBtn = this.handleControlBtn.bind(this);
		this.handleTypeSelect = this.handleTypeSelect.bind(this);
		this.getHighScore = this.getHighScore.bind(this);
		this.comparingScores = this.comparingScores.bind(this);
	}

	componentDidMount(){
		this.getHighScore();
	}

	getHighScore(){
		let thisUserId = localStorage.getItem("userId");
		if (thisUserId !== null){
			gameAPI.getUserHighScore(thisUserId).then(function(thisUser) {
				console.log("thisUser", thisUser.data.userInfo.highScore);
				this.setState({
					highScore: thisUser.data.userInfo.highScore
				});
			}.bind(this));
		} else {
			console.log("You need to sign in");
		}
	}

	comparingScores(){
		if (this.state.highScore < this.state.score){
			let thisUserId = localStorage.getItem("userId");
			this.setState({
				highScore: this.state.score
			}, function(){
				gameAPI.updateUserHighScore(thisUserId, this.state.highScore).then(function(updatedScore){
					console.log("updatedScore:", updatedScore);
				}.bind(this));
			}.bind(this));
		} 
	}

	handleScore(result){
		if (result === "true"){
			this.setState({
				score: (this.state.score + 1)
			});
		}
		console.log("update score:", this.state.score);
	}

	handleControlBtn(playingBoolean, score){
		this.setState({
			playing: playingBoolean, 
			score: score
		});
	}

	handleTypeSelect(type){
		this.setState({
			gametype: type,
			playing: false
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
						highScore = {this.state.highScore}
						score = {this.state.score}
						handleControlBtn = {this.handleControlBtn}
						handleTypeSelect = {this.handleTypeSelect}
						
					/>
					<br />
					<Stage 
						handleScore = {this.handleScore}
						playing = {this.state.playing}
						gametype = {this.state.gametype}
						comparingScores={this.comparingScores}
					/>
				</div>

			</div>
		);
	}
}