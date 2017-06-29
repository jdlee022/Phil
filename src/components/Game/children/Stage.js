import React, { Component } from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {CSSTransitionGroup} from 'react-transition-group'
import oedipus from '../assets/img/Oedipus_transbg.png'
import sphinx from '../assets/img/Sphinx_transbg.png'

import sphinx_laser from '../assets/img/Sphinx_laser_transbg.png'
import MtSvgLines from 'react-mt-svg-lines'
import quizletAPI from '../utils/quizletAPI'
import quoteAPI from '../utils/quoteAPI'

import '../style.css'

export default class Play extends Component {
	constructor() {
		super();
		this.state = {
			playing: false,
			quoteBank: [],
			currentQuote: {},
			currentIndex: 0, 
			matched: "",
			sphinxSrc: sphinx, 
			answer: "", 
			feedback: ""
		}

		this.handleAnswer = this.handleAnswer.bind(this);
		this.handleInput = this.handleInput.bind(this);
		// this.renderLaser = this.renderLaser.bind(this);
		this.renderNormal = this.renderNormal.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.handleAPI = this.handleAPI.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.laser = this.laser.bind(this);
		// this.handlePlay = this.handlePlay.bind(this);
	}

	componentDidMount() {
		this.handleAPI();
		this.setState({
			currentQuote: {
				quote: "Sphinx: I am the protector of Thebes. Only those who can answer my questions correctly can pass. Maybe you can help Oedipus get back to his journey."
			}
		}, function(){
			setTimeout(function(){
				this.setState({
					currentQuote: {
						quote: "Sphinx: A wrong answer will hurt Oedipus. You can only miss 5 before Oedipus has to turn around. Click 'Start' to play."
					}
				});
			}.bind(this), 2000);
		});
	}

	componentWillReceiveProps(nextProps){
		console.log("nextProps", nextProps);
		this.setState({
			playing: nextProps.playing, 
		}, function(){
			this.startGame();
		}.bind(this)); 
	}


	handleAPI(){
		quoteAPI.getQuotes().then(function (allQuotes) {
			console.log(" quoteAPI:", allQuotes);
			this.setState({
				quoteBank: allQuotes.data.allQuotes
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
		if (this.state.answer === this.state.currentQuote.author){
			console.log("the answer is correct");
			this.setState({
				matched: "true",
				feedback: "Correct", 
				answer: "",
				currentIndex: (this.state.currentIndex + 1),
			}, function () {
				console.log("this.state.matched:", this.state.matched);
				this.props.handleScore(this.state.matched);
				setTimeout(function () {
					if ((this.state.currentIndex) < (this.state.quoteBank).length) {
						this.nextQuestion();
					} else {
						this.setState({
							currentQuote: {
								quote: "End of game", 
								feedback: ""
							}
						});
					}
				}.bind(this), 500); 
			});
		} else if (this.state.answer !== this.state.currentQuote.author){
			console.log("the answer is incorrect");
				this.setState({
					matched: "false",
					sphinxSrc: sphinx_laser, 
					feedback: "Incorrect", 
					answer: "",
					currentIndex: (this.state.currentIndex + 1),
				}, function () {
					console.log("this.state.matched:", this.state.matched);
					this.props.handleScore(this.state.matched);
					setTimeout(function() {
						if ((this.state.currentIndex) < (this.state.quoteBank).length) {
							this.nextQuestion();
						} else {
							this.setState({
								currentQuote: {
									quote: "End of game", 
									
								}, 
								matched: "",
								sphinxSrc: sphinx,
								feedback: ""
							});
						}
					}.bind(this), 1000); 
				});
			} 
	}
 
	startGame(){
		if(this.state.playing === true) {
			if (this.state.currentIndex === 0) {
				setTimeout(function() {
					this.setState({
						currentQuote: {
							quote: "Collecting quotes..."
						}
					}, function () {
						this.setState({
							currentQuote:this.state.quoteBank[this.state.currentIndex]
						});
					}.bind(this));
				}.bind(this), 1200);	
			}
		} else {
			this.resetGame()
		}
	}

	resetGame(){
		this.setState({
			playing: false,
			currentQuote: this.state.quoteBank[0],
			currentIndex: 0,
			matched: "",
			sphinxSrc: sphinx,
			answer: "",
			feedback: ""
			
		})
	}

	nextQuestion(){
		this.setState({
			matched: "",
			sphinxSrc: sphinx, 
			currentQuote: (this.state.quoteBank[this.state.currentIndex]),
			feedback: ""
		}, function () {
			console.log("Next question THIS.STATE", this.state);
		}.bind(this));
	}

	laser(){
		if (this.state.matched === 'false'){
			return (
				<MtSvgLines animate={true} duration={300}>
					<svg viewBox="0 0 100 5">
						<path stroke="red" strokeWidth="3" fill="none" d="m0,0, h1000" />
					</svg>
				</MtSvgLines>
			)
		}
	}

	// renderLaser(){
	// 	return (
	// 		<div className="row container-fluid">
	// 			<div className="row progress-bar">
	// 				<div className="progress">
	// 					<div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
	// 						ariaValuenow="70" ariaValuemin="0" ariaValuemax="100">
	// 						70% Complete (danger)
  	// 					</div>
	// 					<div className="progress">
	// 						<div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
	// 							ariaValuenow="70" ariaValuemin="0" ariaValuemax="100">
	// 							70% Complete (danger)
  	// 					</div>
	// 					</div>
	// 				</div>
	// 			</div>


	// 			<div className="row">
	// 				<div className="talk-bubble tri-right border round btm-left-in">
	// 					<div className="talktext">
	// 						<p>{this.state.currentQuote.term}</p>
	// 					</div>
	// 				</div>
	// 			</div>

	// 			<div className="row">
	// 				<img onClick={this.handleSphinxAnimation} className="col-lg-4" src={this.state.sphinxSrc} alt="Sphinx" />

	// 				<div className="laser-line col-lg-4">
	// 					<br /> <br /> <br /> <br />
	// 					<MtSvgLines animate={true} duration={300}>
	// 						<svg viewBox="0 0 100 5">
	// 							<path stroke="red" strokeWidth="3" fill="none" d="m0,0, h1000" />
	// 						</svg>
	// 					</MtSvgLines>
	// 					<div >
	// 						<br /> <br /> <br />  <br /> <br /> <br />
	// 						<label htmlFor="">Who said this?</label><br />
	// 						Answer: <input type="text" onInput={this.handleInput} value={this.state.answer} />
	// 						<input type="submit" value="Submit" onClick={this.handleAnswer} />
	// 					</div>
	// 				</div>

	// 				<img className="col-lg-4" src={oedipus} alt="Oedipus" />
	// 			</div>

	// 		</div>
	// 	)
	// }
	
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
				
				<div className="row">
					<div className="talk-bubble tri-right border round btm-left-in">
						<div className="talktext">
							<p>{this.state.currentQuote.quote}</p>
						</div>
					</div>
				</div>

				<div className="row">
					<img onClick={this.handleSphinxAnimation} className="col-lg-4" src={this.state.sphinxSrc} alt="Sphinx" />

					<div className="laser-line col-lg-4">
						<br /> <br /> <br /> <br />
						{this.laser()}
						<div >
							<br /> <br /> <br />  <br /> <br /> <br />
							<label htmlFor="">Who said this?</label><br />
							Answer: <input type="text" onInput={this.handleInput} value={this.state.answer} />
							<input type="submit" value="Submit" onClick={this.handleAnswer} />
						</div>
						<div>
							<p class="feedback">{this.state.feedback}</p>	
						</div>
					</div>

					<img className="col-lg-4" src={oedipus} alt="Oedipus" />
				</div>

			</div>
		)
	}

	render() {
		// if (this.state.matched === 'false') {
		// 	return this.renderLaser();
		// } else {
			return this.renderNormal();
		// }
		
	}
}