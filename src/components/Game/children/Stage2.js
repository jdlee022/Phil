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
				hint: "Sphinx: Hello!"
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
			choicesWho: [],
			choicesWhich: []
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
		this.sortChoiceArray = this.sortChoiceArray.bind(this);
	}

	//  Introduction to the game 
	componentDidMount() {
		this.handleAPI();
		this.setState({
			currentQuestion: {
				hint: "Sphinx: I am the protector of Thebes. You can help Oedipus get back to his journey by answering my questions correctly. Click 'Start' to play."
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
						hint: "Collecting questions..."
					}
				});
				setTimeout(function(){
					this.setState({
						currentQuestion: {
							hint: "Start in 3..."
						}
					});
				}.bind(this), 1000);
				setTimeout(function () {
					this.setState({
						currentQuestion: {
							hint: "2..."
						}
					});
				}.bind(this), 2000);
				setTimeout(function () {
					this.setState({
						currentQuestion: {
							hint: "1..."
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
					hint: "Click Start to play.",
				}, 
				life: 5,
				currentIndex: 0
			});
		} else if (this.state.playing === 'reset') {
			this.resetGame();
		}
	}

	setupGameType() {
		this.setState({
			currentQuestion: {
				hint: "Click Start to play.",
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
					this.sortChoiceArray();
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
					this.sortChoiceArray();
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


	handleAnswer(event){
		if (event){
			event.preventDefault();
		}
		var submittedAns = this.state.answer.trim().toLowerCase();
		if (this.state.currentQuestion.answer === undefined){
			this.setState({
				currentQuestion: {
					hint: "Please start the game before submitting an answer!"
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
					}.bind(this), 1500); 
				});
			} 
	}
	
	endGame(){
		this.props.comparingScores();
		this.setState({
			currentQuestion: {
				hint: "Gameover. You can Start another game at anytime.",
				answer: '', 
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
				hint: "Resetting Game...",
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
						hint: "Click Start to play."
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
				<div className = "game-result">
					<p class="incorrect">Incorrect!</p>
					<p>Answer: {this.state.currentQuestion.answer}</p>
				</div>	
			)
		} else if (this.state.matched === "true"){
			return (
				<div className="game-result">
					<p class="incorrect">Correct!</p>
					<p>Answer: {this.state.currentQuestion.answer}</p>
				</div>
			)
		};
	}
	
	timerClock(){
		if (this.state.timer === true){
			if (this.state.currentQuestion.gametype === "whosaysthis"){
				return (
					<ReactCountdownClock seconds={15}
						color="#fff"
						alpha={0.9}
						size={70}
						weight={8}
						onComplete={this.handleAnswer.bind(this)}
					/>
				)
			} else if (this.state.currentQuestion.gametype === "whichperiodisthisfrom") {
				return (
					<ReactCountdownClock seconds={20}
						color="#fff"
						alpha={0.9}
						size={70}
						weight={8}
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
				<div className="laser-line col-xs-4">
					<MtSvgLines animate={true} duration={700}>
						<svg viewBox="0 0 1000 5">
							<path stroke="red" strokeWidth="7" fill="red" d="m0,0, h820" />
						</svg>
					</MtSvgLines>
				</div>
				
			)
		}
	}

	sortChoiceArray(){
		
	}

	answerChoices(){
		if (this.state.currentQuestion.question = "Who said this?"){
			return (
				<p>Choices: ()</p>
			)
		}
		else if (this.state.currentQuestion.question = "Which period is this from?") {
			return (
				<p>Choices: ()</p>
			)
		}
	}

	renderNormal(){
		return (
			<div className="container all-game-stage">
				<div className="row stage-component">
					<div className="col-xs-4 talk-bubble tri-right border round btm-left-in">
						<div className="talktext">
							<p>{this.state.currentQuestion.hint}</p>
						</div>
					</div>

					<div className="col-xs-4 clock">
						&nbsp;
						{this.timerClock()}
					</div>

					<div className="col-xs-4 oedipus-life">
						<h3>Oedipus: {this.state.life}</h3>
					</div>
				</div>

				<div className="row game-img-animation">
					<div className="sphinx-div col-sm-4">
						<img onClick={this.handleSphinxAnimation} className="sphinx" src={this.state.sphinxSrc} alt="Sphinx" />
					</div>
					{this.laser()}
					{this.correctAnswerDisplay()}

					<div className="animation-answer col-xs-4">

						<div className="answerbox">
							<h4 className="main-question">{this.state.currentQuestion.question}</h4>
			
							
							<label>Answer: </label><br />
							<form action="" onSubmit={this.handleAnswer}>
								<div className="input-container">
									<input className="game-answer-box" type="text" onInput={this.handleInput} value={this.state.answer} />
								</div>
								<input className="ansSubmitBtn" type="submit" value="Submit" />
							</form>
							
						</div>
						<div>
							<p className="feedback">{this.state.feedback}</p>
						</div>
					</div>

					<div className="oedipus-div col-xs-4">
						<img className="oedipus" src={this.state.oedipus} alt="Oedipus" />
					</div>

				</div>

			</div>
		)
	}

	render() {
		return this.renderNormal();
	}
}