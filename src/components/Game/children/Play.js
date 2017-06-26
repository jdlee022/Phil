import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

import oedipus from '../assets/img/Oedipus.jpg'
import sphinx from '../assets/img/Sphinx.jpg'
import MtSvgLines from 'react-mt-svg-lines'
import quizletAPI from '../utils/quizletAPI'


export default class Play extends Component {
	constructor(){
		super();
		this.state = {
			quoteBank: [],
			currentQuote: {}
		}
	}

	componentDidMount(){
		this.handleStartGame();
	}

	handleStartGame(){
		quizletAPI.getQuotes().then(function(allQuotes){
			console.log("allQuotes from quizletAPI:", allQuotes.data.terms);
			this.setState({
				quoteBank: allQuotes.data.terms
			});
		}.bind(this));
	}

	laserLine(){
		return (
			<MtSvgLines animate={true} duration={500}>
				<svg viewBox="0 0 100 5">
					<path stroke="red" strokeWidth="3" fill="none" d="m0,0, h50" />
				</svg>
			</MtSvgLines>
		)
	}


	render() {
		return (
			<div className="row container-fluid">
				{/**<div className="row progress-bar">
					<div className="progress">
						<div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
							aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
							70% Complete (danger)
  						</div>
						<div className="progress">
							<div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
								aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
								70% Complete (danger)
  						</div>
						</div>
					</div>
				</div>
				*/}
				<ReactCSSTransitionGroup 
					ransitionName="gameIntro"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}
				>
					<div>
						<p>Sphinx used to sit outside of Thebes, asking riddles to anyone who passed by. Only you can help Oedipus get back to his journey.</p>
						<p>Collecting Quotes...</p>
					</div>
				</ReactCSSTransitionGroup>
				

				<div className="row">
					<p className="col-lg-6 questionBox">
						"Quote from someone"
					</p>
				</div>

				<div className="laser-line row">
					<button onClick={this.laserLine}> Laser </button>
					<MtSvgLines animate={true} duration={500}>
						<svg viewBox="0 0 100 5">
							<path stroke="red" strokeWidth="3" fill="none" d="m0,0, h50" />
						</svg>
					</MtSvgLines>
				</div>

				<div className="row">
					<img className="col-lg-4" src={sphinx} alt="Sphinx"/>
					<form action="" className="col-lg-4" onSubmit={this.handlingSubmit}>
						<br /> <br /> <br />  <br /> <br /> <br />
						<label htmlFor="">Who said this?</label><br />
						Answer: <input type="text" />
						<input type="submit" value="Submit"/>
					</form>
					<img className="col-lg-4" src={oedipus} alt="Oedipus" />
				</div>
					
			</div>
		)
	}
}