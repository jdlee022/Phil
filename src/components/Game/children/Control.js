import React, { Component } from 'react'

import '../style.css'

export default class Control extends Component {
	constructor() {
		super();
		this.state = {
			playing: false,
			score: 0,
			gametype: "",
			disabled: true
		}
		this.handlingReset = this.handlingReset.bind(this);
		this.handlingStart = this.handlingStart.bind(this);
		this.handleTypeSelect = this.handleTypeSelect.bind(this);
	}

	handleTypeSelect(event){
		this.setState({
			[event.target.name]: event.target.value
		}, function(){
			this.props.handleTypeSelect(this.state.gametype);
		});
	}

	handlingStart() {
		this.setState({
			playing: true,
			score: 0, 
			disabled: false
		}, function(){
			this.props.handleControlBtn(this.state.playing);
		});
	}

	handlingReset() {
		// this.props.handlingReset();
		this.setState({
			score: 0,
			playing: "reset",
			disabled: true
		}, function(){
			this.props.handleControlBtn(this.state.playing);
		});
	}

	componentWillReceiveProps(nextProps) {
		console.log("nextProps:", nextProps.score);
		this.setState({
			score: nextProps.score
		});
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-4">
						<div>	
							Type of Questions:
							<select onChange={this.handleTypeSelect} name="gametype" id="">
								<option selected="selected" value="Select the type of game"></option>
								<option value="whichperiodisthisfrom">Which period is this from?</option>
								<option value="whosaysthis">Who says this?</option>
								<option value="mixed">Mixed (All)</option>
							</select>
						</div>
						<button onClick={this.handlingStart} type="button" class="start btn btn-md"> <span className="glyphicon glyphicon-play"></span></button>
						<button onClick={this.handlingReset} type="button" class="reset btn btn-md"> <span className="glyphicon glyphicon-refresh"></span></button>
					</div>
					<div className="">
						Score: {this.state.score}
					</div>	
				</div>
			</div>
		)
	}
}
