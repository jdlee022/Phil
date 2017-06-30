import React, { Component } from 'react'

import oedipus from '../assets/img/Oedipus_transbg.png'
import sphinx from '../assets/img/Sphinx_transbg.png'
import sphinx_laser from '../assets/img/Sphinx_laser_transbg.png'
import oedipus_laser from '../assets/img/Oedipus_laser.png'

import MtSvgLines from 'react-mt-svg-lines'
import ReactCountdownClock from 'react-countdown-clock'

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
			feedback: "", 
			life : 5, 
			timer: false, 
			oedipus: oedipus
		}

		this.handleAnswer = this.handleAnswer.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.renderNormal = this.renderNormal.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.handleAPI = this.handleAPI.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.laser = this.laser.bind(this);
		this.timerClock = this.timerClock.bind(this);
		this.endGame = this.endGame.bind(this);
		this.correctAnswerDisplay = this.correctAnswerDisplay.bind(this);
	}

	componentDidMount() {
		this.handleAPI();
		this.setState({
			currentQuote: {
				quote: "Sphinx: 'I am the protector of Thebes. You can help Oedipus get back to his journey by answering my questions correctly.' "
			}
		}, function(){
			setTimeout(function(){
				this.setState({
					currentQuote: {
						quote: "Sphinx: 'A wrong answer will hurt Oedipus. You can only miss 5 questions before Oedipus has to turn around. Click 'Start' to play.'"
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

	handleAnswer(){
		// event.preventDefault();
		var submittedAns = this.state.answer.trim().toLowerCase();
		var theRightAns = this.state.currentQuote.author.trim().toLowerCase();
		if (submittedAns === theRightAns){
			console.log("the answer is correct");
			this.setState({
				matched: "true",
				feedback: "Correct", 
				answer: "",
				currentIndex: (this.state.currentIndex + 1),
				timer: false
			}, function () {
				console.log("this.state.matched:", this.state.matched);
				this.props.handleScore(this.state.matched);
				setTimeout(function () {
					if ((this.state.currentIndex) < (this.state.quoteBank).length && this.state.life > 0) {
						this.nextQuestion();
					} else {
						this.endGame();
					}
				}.bind(this), 500); 
			});
		} else if (submittedAns !== theRightAns){
			console.log("the answer is incorrect");
				this.setState({
					matched: "false",
					sphinxSrc: sphinx_laser, 
					oedipus: oedipus_laser,
					feedback: "Incorrect", 
					answer: "",
					currentIndex: (this.state.currentIndex + 1),
					life : (this.state.life - 1), 
					timer: false
				}, function () {
					console.log("this.state.matched:", this.state.matched);
					this.props.handleScore(this.state.matched);
					setTimeout(function() {
						if ((this.state.currentIndex) < (this.state.quoteBank).length && this.state.life > 0) {
							this.nextQuestion();
						} else {
							this.endGame();
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
							quote: "Collecting quotes...", 
							life: 5
						}
					}, function () {
						this.setState({
							currentQuote: this.state.quoteBank[this.state.currentIndex], 
							timer: true
						});
					}.bind(this));
				}.bind(this), 1200);	
			}
		} else {
			this.resetGame()
		}
	}
	
	endGame(){
		this.setState({
			currentQuote: {
				quote: "End of game",
				author: ''
			},
			matched: "",
			sphinxSrc: sphinx,
			oedipus: oedipus,
			feedback: "",
			timer: false,
			playing: false,
			currentIndex: 0
		});
	}

	resetGame(){
		this.setState({
			playing: false,
			currentQuote: {
				quote: "Resetting Game..."
			},
			currentIndex: 0,
			matched: "",
			sphinxSrc: sphinx,
			oedipus: oedipus,
			answer: "",
			feedback: "", 
			timer: false,
			life: 5
		}, function(){
			this.setState({
				currentQuote:this.state.quoteBank[this.state.currentIndex]
			});
		}.bind(this));
	}

	nextQuestion(){
		this.setState({
			matched: "",
			sphinxSrc: sphinx, 
			oedipus: oedipus,
			currentQuote: (this.state.quoteBank[this.state.currentIndex]),
			feedback: "", 
			timer: true
		}, function () {
			console.log("Next question THIS.STATE", this.state);
		}.bind(this));
	}

	correctAnswerDisplay(){
		if (this.state.matched === "false"){
			return (
				<h3>Correct Answer: {this.state.currentQuote.author}</h3>
			)
		} else return;
	}
	
	timerClock(){
		if (this.state.timer === true){
			return (
				<ReactCountdownClock seconds={5}
					color="#fff"
					alpha={0.9}
					size={100}
					weight={10}
					onComplete={this.handleAnswer.bind(this)}
				/>
			)
		} else {
			return;
		}
		
	}

	laser(){
		if (this.state.matched === 'false'){
			return (
				<MtSvgLines animate={true} duration={1000}>
					<svg viewBox="0 0 100 5">
						<path stroke="red" strokeWidth="3" fill="none" d="m0,0, h1000" />
					</svg>
				</MtSvgLines>
			)
		}
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
				
				<div className="row">
					<div className="col-lg-5 talk-bubble tri-right border round btm-left-in">
						<div className="talktext">
							<p>{this.state.currentQuote.quote}</p>
						</div>
					</div>

					<div className="col-lg-5">
						<h3>Oedipus: {this.state.life}</h3>
					</div>
				</div>

				<div className="row">
					<img onClick={this.handleSphinxAnimation} className="col-lg-4" src={this.state.sphinxSrc} alt="Sphinx" />
					
					<div className="laser-line col-lg-4">
						<div className="clock">
							{this.timerClock()}

							{/**onComplete={this.nextQuestion}*/}
						</div>
						<br /> <br /> <br /> <br />
						{this.laser()}

						<div>
							{this.correctAnswerDisplay()}
							<br /> <br /> 
							<label htmlFor="">Who said this?</label><br />
							Answer: 
							<div className="input-container">
								<input type="text" onInput={this.handleInput} value={this.state.answer} />
							</div>
							<input type="submit" value="Submit" onClick={this.handleAnswer}/>
						</div>
						<div>
							<p class="feedback">{this.state.feedback}</p>
						</div>
					</div>

					<img className="col-lg-4" src={this.state.oedipus} alt="Oedipus" />
				</div>

			</div>
		)
	}

	render() {
		return this.renderNormal();

	}
}