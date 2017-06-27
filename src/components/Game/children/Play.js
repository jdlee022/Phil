import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {CSSTransitionGroup} from 'react-transition-group'
// import oedipus from '../assets/img/Oedipus.jpg'
// import sphinx from '../assets/img/Sphinx.jpg'
import oedipus from '../assets/img/Oedipus_transbg.png'
import sphinx from '../assets/img/Sphinx_transbg.png'

import sphinx_laser from '../assets/img/Sphinx_laser_transbg.png'
import MtSvgLines from 'react-mt-svg-lines'
import quizletAPI from '../utils/quizletAPI'

import '../style.css'

export default class Play extends Component {
	constructor() {
		super();
		this.state = {
			quoteBank: [],
			currentQuote: {},
			quoteIndex: 0, 
			sphinxSrc: sphinx
		}
		this.handleSphinxAnimation = this.handleSphinxAnimation.bind(this);
	}

	componentDidMount() {
		this.handleStartGame();
	}

	handleStartGame() {
		quizletAPI.getQuotes().then(function (allQuotes) {
			console.log("allQuotes from quizletAPI:", allQuotes.data.terms);
			this.setState({
				quoteBank: allQuotes.data.terms
			});
		}.bind(this));
	}

	laserLine() {
		return (
			<MtSvgLines animate={true} duration={500}>
				<svg viewBox="0 0 100 5">
					<path stroke="red" strokeWidth="3" fill="none" d="m0,0, h50" />
				</svg>
			</MtSvgLines>
		)
	}

	handleSphinxAnimation(){
		this.setState({
			sphinxSrc: sphinx_laser
		});
	}

	render() {
		return (
			<div className="row container-fluid">
				<div className="row progress-bar">
					<div className="progress">
						<div transition className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
							ariaValuenow="70" ariaValuemin="0" ariaValuemax="100">
							70% Complete (danger)
  						</div>
						<div className="progress">
							<div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
								ariaValuenow="70" ariaValuemin="0" ariaValuemax="100">
								70% Complete (danger)
  						</div>
						</div>
					</div>
				</div>
				
				<CSSTransitionGroup 
					transitionName="intro"
					transitionAppear={true}
					transitionEnterTimeout={1500}
					transitionLeaveTimeout={300}>
					<div>
						<p>Sphinx used to sit outside of Thebes, asking riddles to anyone who passed by. Only you can help Oedipus get back to his journey.</p>
						<br/>
						<p>Collecting Quotes...</p>
					</div>
				</CSSTransitionGroup>

				<div className="row">
					<div className="talk-bubble tri-right border round btm-left-in">
						<div className="talktext">
							<p>This is the quote....</p>
						</div>
					</div>
				</div>

				<div className="row">
					<img onClick={this.handleSphinxAnimation} className="col-lg-4" src={this.state.sphinxSrc} alt="Sphinx" />

					<div className="laser-line col-lg-4">
						<br/> <br/> <br/> <br/>
						<MtSvgLines animate={true} duration={2000}>
							<svg width="1200" height="10" version="1.1" id="laser" x="-10px" y="100px"
								xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve">
								<path d="M0 1 h 600"stroke="red" strokeWidth="10" fill="none" />
							</svg>
						</MtSvgLines>
						<form action=""  onSubmit={this.handlingSubmit}>
							<br /> <br /> <br />  <br /> <br /> <br />
							<label htmlFor="">Who said this?</label><br />
							Answer: <input type="text" />
							<input type="submit" value="Submit" />
						</form>
					</div>
					
					<img className="col-lg-4" src={oedipus} alt="Oedipus" />
				</div>

			</div>
		)
	}
}