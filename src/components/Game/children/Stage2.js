import React, { Component } from 'react'

import oedipus from '../assets/img/Oedipus_full01.png'
import sphinx from '../assets/img/Sphinx_transbg.png'
import sphinx_laser from '../assets/img/Sphinx_laser_transbg.png'
import oedipus_laser from '../assets/img/Oedipus_full_laser.png'

import MtSvgLines from 'react-mt-svg-lines'
import ReactCountdownClock from 'react-countdown-clock'

import gameAPI from '../utils/gameAPI'

import '../style.css'

export default class Play extends Component {
	constructor() {
		super();
		this.state = {
			playing: false,
			questionBank: [],
			currentQuestion: {
				question: "Sphinx: Hello!"
			},
			currentIndex: 0, 
			matched: "",
			sphinxSrc: sphinx, 
			oedipus: oedipus,
			answer: "", 
			feedback: "", 
			life : 5, 
			timer: false,
			gametype: "mixed", 
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
		this.setupGameType = this.setupGameType.bind(this);
	}

	//  Introduction to the game 
	componentDidMount() {
		this.handleAPI();
		this.setState({
			currentQuestion: {
				question: "Sphinx: I am the protector of Thebes. You can help Oedipus get back to his journey by answering my questions correctly. Click 'Start' to play."
			}
		});
			
	}

	// When the start/reset or gametype is changed,
	// this receives the props and set the state of playing (t/f) 
	// and gametype to find the appropriate info from db
	componentWillReceiveProps(nextProps){
		console.log("nextProps", nextProps);
		if (nextProps.playing !== this.state.playing){
			this.setState({
				playing: nextProps.playing, 
				currentIndex: 0
			}, function(){
				this.startGame();
			}.bind(this));
		}
		if (nextProps.gametype !== this.state.gametype) {
			this.setState({
				gametype: nextProps.gametype
			}, function () {
				this.setupGameType();
				this.handleAPI()
			}.bind(this));
		}
	}

	startGame() {
		if (this.state.playing === true) {
			if (this.state.currentIndex === 0) {
				this.setState({
					currentQuestion: {
						question: "Collecting questions..."
					}
				});
				setTimeout(function(){
					this.setState({
						currentQuestion: {
							question: "Start in 3..."
						}
					});
				}.bind(this), 1000);
				setTimeout(function () {
					this.setState({
						currentQuestion: {
							question: "2..."
						}
					});
				}.bind(this), 2000);
				setTimeout(function () {
					this.setState({
						currentQuestion: {
							question: "1..."
						}
					});
				}.bind(this), 3000);
				setTimeout(function () {
					this.setState({
						currentQuestion: this.state.questionBank[this.state.currentIndex],
						timer: true
					});
				}.bind(this), 4000);
			}
		} else if (this.state.playing === false) {
			this.setState({
				currentQuestion: {
					question: "Click Start to play.",
					life: 5
				}, 
				currentIndex: 0
			});
		} else if (this.state.playing === 'reset') {
			this.resetGame();
		}
	}

	setupGameType() {
		this.setState({
			currentQuestion: {
				question: "Click Start to play.",
				answer: ""
			},
			playing: false,
			questionBank: [],
			currentIndex: 0,
			matched: "",
			sphinxSrc: sphinx,
			oedipus: oedipus,
			answer: "",
			feedback: "",
			life: 5,
			timer: false
		}, function () {
			var question = this.state.questionBank[this.state.currentIndex]
			if (question)
				this.setState({
					currentQuestion: question
				});
			// callback();
		}.bind(this));
	}

	//this looks at the gametype state and find the right set of questions
	handleAPI(){
		if (this.state.gametype !== "mixed"){
			gameAPI.getSpecificQuestions(this.state.gametype).then(function (questions){
				console.log(" quoteAPI:", questions);
				this.setState({
					questionBank: questions.data.specificQuestions
				}, function () {
					console.log("THIS.STATE", this.state);
				});
			}.bind(this));
		} 

		else if (this.state.gametype === "mixed"){
			gameAPI.getAllQuestions().then(function (questions) {
				console.log(" quoteAPI:", questions);
				this.setState({
					questionBank: questions.data.allQuestions
				}, function () {
					console.log("THIS.STATE", this.state);
				});
			}.bind(this));
		}
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
		if (this.state.currentQuestion.answer === undefined){
			this.setState({
				currentQuestion: {
					question: "Please start the game before submitting an answer!"
				}
			});
			return;
		}
		var theRightAns = this.state.currentQuestion.answer.trim().toLowerCase();
		if (submittedAns === theRightAns){
			console.log("the answer is correct");
			this.setState({
				matched: "true",
				feedback: "Correct", 
				answer: "",
				timer: false
			}, function () {
				console.log("this.state.matched:", this.state.matched);
				this.props.handleScore(this.state.matched);
				setTimeout(function () {
					if ((this.state.currentIndex + 1) < (this.state.questionBank).length && this.state.life > 0) {
						this.setState({
							currentIndex: (this.state.currentIndex + 1),
						}, function () {
							this.nextQuestion();
						});	
					} else {
						this.setState({
							currentIndex: (this.state.currentIndex + 1),
						}, function () {
							this.endGame();
						});	
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
					life : (this.state.life - 1), 
					timer: false
				}, function () {
					console.log("this.state.matched:", this.state.matched);
					this.props.handleScore(this.state.matched);
					setTimeout(function() {
						if ((this.state.currentIndex + 1) < (this.state.questionBank).length && this.state.life > 0) {
							this.setState({
								currentIndex: (this.state.currentIndex + 1),
							}, function(){
								this.nextQuestion();
							});	
						} else {
							this.setState({
								currentIndex: (this.state.currentIndex + 1),
							}, function () {
								this.endGame();
							});	
						}
					}.bind(this), 1000); 
				});
			} 
	}
	
	endGame(){
		this.props.comparingScores();
		this.setState({
			currentQuestion: {
				question: "Gameover. /n You can Start another game at anytime.",
				author: '', 
				gametype: ""
			},
			matched: "",
			sphinxSrc: sphinx,
			oedipus: oedipus,
			feedback: "",
			timer: false,
			timeToAns: 5,
			playing: false,
			currentIndex: 0, 
			gametype:""
		});
	}

	resetGame(){
		this.setState({
			playing: 'reset',
			currentQuestion: {
				question: "Resetting Game...",
				answer: "",
				gametype: ""
			},
			currentIndex: 0,
			matched: "",
			sphinxSrc: sphinx,
			oedipus: oedipus,
			answer: "",
			feedback: "", 
			timer: false,
			life: 5,
			gametype: ""
		}, function(){
			setTimeout(function() {
				this.setState({
					currentQuestion: {
						question: "Click Start to play."
					}
				});	
			}.bind(this), 1000);
		}.bind(this), function(){
			this.setState({
				currentQuestion: this.state.questionBank[this.state.currentIndex]
			});
		}.bind(this));
	}

	nextQuestion(){
		this.setState({
			matched: "",
			sphinxSrc: sphinx, 
			oedipus: oedipus,
			currentQuestion: (this.state.questionBank[this.state.currentIndex]),
			feedback: "", 
			timer: true
		}, function () {
			console.log("Next question THIS.STATE", this.state);
		}.bind(this));
	}

	correctAnswerDisplay(){
		if (this.state.matched === "false"){
			return (
				<h3>Correct Answer: {this.state.currentQuestion.answer}</h3>
			)
		} else return;
	}
	
	timerClock(){
		if (this.state.timer === true){
			if (this.state.currentQuestion.gametype === "whosaysthis"){
				return (
					<ReactCountdownClock seconds={5}
						color="#fff"
						alpha={0.9}
						size={100}
						weight={10}
						onComplete={this.handleAnswer.bind(this)}
					/>
				)
			} else if (this.state.currentQuestion.gametype === "whichperiodisthisfrom") {
				return (
					<ReactCountdownClock seconds={10}
						color="#fff"
						alpha={0.9}
						size={100}
						weight={10}
						onComplete={this.handleAnswer.bind(this)}
					/>
				)
			} else {
				return (
					<ReactCountdownClock seconds={5}
						color="#fff"
						alpha={0.9}
						size={100}
						weight={10}
						onComplete={this.handleAnswer.bind(this)}
					/>
				)
			}
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
			<div className="row container-fluid stage-div">
				<div className="row">
					<div className="col-md-4 talk-bubble tri-right border round btm-left-in">
						<div className="talktext">
							<p>{this.state.currentQuestion.question}</p>
						</div>
					</div>
					<div className="col-md-4 clock">
						&nbsp;
						{this.timerClock()}
						
					</div>
					<div className="col-md-4 offset-md-4 ">
						<h3>Oedipus: {this.state.life}</h3>
					</div>
				</div>

				<div className="row story-imgs">
					<img onClick={this.handleSphinxAnimation} className="col-lg-4 sphinx" src={this.state.sphinxSrc} alt="Sphinx" />
					
					<div className="laser-line col-lg-4">
						
						<br /> <br /> <br /> <br />
						{this.laser()}

						<div class="answerbox">
							{this.correctAnswerDisplay()}
							<br /> <br /> 
							<label htmlFor="">{this.state.currentQuestion.gametype}</label><br />
							Answer: 
							<div className="input-container">
								<input type="text" onInput={this.handleInput} value={this.state.answer} />
							</div>
							<input type="submit" value="Submit" onClick={this.handleAnswer}/>
						</div>
						<div>
							<p className="feedback">{this.state.feedback}</p>
						</div>
					</div>

					<img className="col-lg-4 oedipus" src={this.state.oedipus} alt="Oedipus" />
				</div>

			</div>
		)
	}

	render() {
		return this.renderNormal();

	}
}