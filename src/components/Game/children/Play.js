import React, { Component } from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
			playing: true,
			quoteBank: [],
			currentQuote: {},
			quoteIndex: 0, 
			matched: "",
			sphinxSrc: sphinx, 
			answer: ""
		}

		this.handleAnswer = this.handleAnswer.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.renderLaser = this.renderLaser.bind(this);
		this.renderNormal = this.renderNormal.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount() {
		// this.runIntro();
		this.handleStartGame(function(){
			if (this.state.playing) {
				let thisIndex = 0;
				if (thisIndex !== this.state.currentIndex) {
					this.setState({
						currentIndex: thisIndex
					});
				}
				let thisQuote = {
					definition: this.state.quoteBank[thisIndex].definition,
					term: this.state.quoteBank[thisIndex].term
				}
				if (thisQuote !== this.state.currentQuote) {
					this.setState({
						currentQuote: thisQuote
					});
				}
			}
		}.bind(this));
		
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			playing: nextProps.playing
		});
	}

	handleStartGame(callback) {
		quizletAPI.getQuotes().then(function (allQuotes) {
			console.log("allQuotes from quizletAPI:", allQuotes.data.terms);
			this.setState({
				quoteBank: allQuotes.data.terms
			}, function(){
				callback();
			});
		}.bind(this));
		console.log("THIS.STATE", this.state);
	}
	
	handleInput(event){
		this.setState({
			answer: event.target.value
		});
		console.log("input:", this.state.answer);
	}

	handleAnswer(event){
		event.preventDefault();
		// this.setState({
		// 	answer: event.target.value
		// });
		if (this.state.answer === this.state.currentQuote.definition){
			console.log("the answer is correct");
			if ((this.state.currentIndex++) < (this.state.quoteBank).length) {
				this.setState({
					matched: "true",
				}, function () {
					console.log("this.state.matched:", this.state.matched);
					this.props.handleScore(this.state.matched);
					this.setState({
						currentIndex: (this.state.currentIndex + 1),
						answer: "", 
						currentQuote: (this.state.quoteBank[this.state.currentIndex])
					}, function(){
						console.log("THIS.STATE", this.state);
					});
				});
			}
			
		} else {
			console.log("the answer is incorrect");
			this.setState({
				matched: "false",
				sphinxSrc: sphinx_laser, 
			}, function () {
				console.log("this.state.matched:", this.state.matched);
				this.props.handleScore(this.state.matched);
				setTimeout(function() {
					this.setState({
						matched: "",
						currentIndex: (this.state.currentIndex + 1),
						answer: "",
						sphinxSrc: sphinx
					}, function () {
						console.log("THIS.STATE", this.state);
						this.setState({
							currentQuote: (this.state.quoteBank[this.state.currentIndex])
						});
					}.bind(this));
				}.bind(this), 1000);
				
			});
		}
	}

	renderLaser(){
		return (
			<div className="row container-fluid">
				<div className="row progress-bar">
					<div className="progress">
						<div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
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
						<br />
						<p>Collecting Quotes...</p>
					</div>
				</CSSTransitionGroup>

				<div className="row">
					<div className="talk-bubble tri-right border round btm-left-in">
						<div className="talktext">
							<p>{this.state.currentQuote.term}</p>
						</div>
					</div>
				</div>

				<div className="row">
					<img onClick={this.handleSphinxAnimation} className="col-lg-4" src={this.state.sphinxSrc} alt="Sphinx" />

					<div className="laser-line col-lg-4">
						<br /> <br /> <br /> <br />
						<MtSvgLines animate={true} duration={300}>
							<svg viewBox="0 0 100 5">
								<path stroke="red" strokeWidth="3" fill="none" d="m0,0, h1000" />
							</svg>
						</MtSvgLines>
						<div >
							<br /> <br /> <br />  <br /> <br /> <br />
							<label htmlFor="">Who said this?</label><br />
							Answer: <input type="text" onInput={this.handleInput} value={this.state.answer} />
							<input type="submit" value="Submit" onClick={this.handleAnswer} />
						</div>
					</div>

					<img className="col-lg-4" src={oedipus} alt="Oedipus" />
				</div>

			</div>
		)
	}
	
	renderNormal(){
		return (
			<div className="row container-fluid">
				<div className="row progress-bar">
					<div className="progress">
						<div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
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
						<br />
						<p>Collecting Quotes...</p>
					</div>
				</CSSTransitionGroup>

				<div className="row">
					<div className="talk-bubble tri-right border round btm-left-in">
						<div className="talktext">
							<p>{this.state.currentQuote.term}</p>
						</div>
					</div>
				</div>

				<div className="row">
					<img onClick={this.handleSphinxAnimation} className="col-lg-4" src={this.state.sphinxSrc} alt="Sphinx" />

					<div className="laser-line col-lg-4">
						<br /> <br /> <br /> <br />
						<div >
							<br /> <br /> <br />  <br /> <br /> <br />
							<label htmlFor="">Who said this?</label><br />
							Answer: <input type="text" onInput={this.handleInput} value={this.state.answer} />
							<input type="submit" value="Submit" onClick={this.handleAnswer} />
						</div>
					</div>

					<img className="col-lg-4" src={oedipus} alt="Oedipus" />
				</div>

			</div>
		)
	}

	render() {
		if (this.state.matched === 'false') {
			return this.renderLaser();
		} else {
			return this.renderNormal();
		}
		
	}
}