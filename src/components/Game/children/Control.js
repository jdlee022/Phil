import React, { Component } from 'react'

import '../style.css'

export default class Control extends Component {
	constructor() {
		super();
		this.state = {
			playing: false,
			score: 0,
			disabled: true
		}
		this.handlingReset = this.handlingReset.bind(this);
		this.handlingStart = this.handlingStart.bind(this);
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
			playing: false,
			disabled: true
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
						<button  onClick={this.handlingStart} className="btn btn-success"><h4>Start</h4></button>
						<button onClick={this.handlingReset} className="btn btn-danger"><h4>Reset</h4></button>

					</div>
					<div className="col-sm-4">
						<h3>Oedipus's Journey</h3>
					</div>
					<div className="col-sm-4">
						<h4>Score: {this.state.score} </h4>
					</div>
				</div>
			</div>
		)
	}
}
