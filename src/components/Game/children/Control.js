import React, { Component } from 'react'

import '../style.css'

export default class Control extends Component {
	constructor() {
		super();
		this.state = {
			playing: false,
			score: 0,
			gametype: "mixed",
			disabled: true, 
			currHighScore: 0,
		}
		this.handlingReset = this.handlingReset.bind(this);
		this.handlingStart = this.handlingStart.bind(this);
		this.handleTypeSelect = this.handleTypeSelect.bind(this);
		// this.handleUserHighScore = this.handleUserHighScore.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		console.log("nextProps:", nextProps.score);
		this.setState({
			score: nextProps.score, 
			currHighScore: nextProps.highScore
		});
	}

	// Look at: user-routes
	// handleUserHighScore() {

	// }

	handleTypeSelect(event){
		this.setState({
			[event.target.name]: event.target.value, 
			playing: false
		}, function(){
			this.props.handleTypeSelect(this.state.gametype, this.state.score);
		});
	}

	handlingStart() {
		this.setState({
			playing: true,
			score: 0, 
			disabled: false
		}, function(){
			this.props.handleControlBtn(this.state.playing, this.state.score);
		});
	}


	handlingReset() {
		// this.props.handlingReset();
		this.setState({
			score: 0,
			playing: "reset",
			disabled: true
		}, function(){
			console.log("RESET state", this.state);
			this.props.handleControlBtn(this.state.playing, this.state.score);
		}.bind(this));
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-4">
						<div>	
							Type of Questions:
							<select onChange={this.handleTypeSelect} name="gametype" id="">
								<option defaultValue value="mixed">Mixed (All)</option>
								<option value="whichperiodisthisfrom">Which period is this from?</option>
								<option value="whosaysthis">Who says this?</option>
								
							</select>
						</div>
						<button onClick={this.handlingStart} type="button" className="start btn btn-md"> <span className="glyphicon glyphicon-play"></span></button>
						<button onClick={this.handlingReset} type="button" className="reset btn btn-md"> <span className="glyphicon glyphicon-refresh"></span></button>
					</div>
					<div className="">
						<h3>Your Current High Score: {this.state.currHighScore}</h3>
						<h3>Score: {this.state.score}</h3>
						
					</div>	
				</div>
			</div>
		)
	}
}
