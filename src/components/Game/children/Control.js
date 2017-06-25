import React, { Component } from 'react'

export default class Control extends Component {
	constructor() {
		super();
		this.state = {
			playing: false,
			gameScore: 0,
		}
	}

	handlingStart() {
		this.setState({
			playing: true,
			score: 0
		});
	}

	handlingReset() {
		// this.props.handlingReset();
		this.setState({
			score: 0
		});
	}	

	render(){
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-4">
						<button onClick={this.handlingStart} className="btn btn-success"><h4>Start</h4></button>
						<button onClick={this.handlingReset} className="btn btn-danger"><h4>Reset</h4></button>
					</div>
					<div className="col-sm-4">
						<h3>Survival of the God</h3>
					</div>
					<div className="col-sm-4">
						<h4>Score: {this.state.score} </h4>
					</div>
				</div>
			</div>
		) 
	}
}