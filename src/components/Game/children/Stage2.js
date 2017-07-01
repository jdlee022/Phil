import React, { Component } from 'react'

import oedipus from '../assets/img/Oedipus_transbg.png'
import sphinx from '../assets/img/Sphinx_transbg.png'
import sphinx_laser from '../assets/img/Sphinx_laser_transbg.png'
import oedipus_laser from '../assets/img/Oedipus_laser.png'

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
			currentQuestion: {},
			currentIndex: 0, 
			matched: "",
			sphinxSrc: sphinx, 
			oedipus: oedipus,
			answer: "", 
			feedback: "", 
			life : 5, 
			timer: false,
			gametype: ""
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
		this.setState({
			currentQuestion: {
				question: "Sphinx: &quot; I am the protector of Thebes. You can help Oedipus get back to his journey by answering my questions correctly. &quot; "
			}
		}, function(){
			setTimeout(function(){
				this.setState({
					currentQuestion: {
						question: "Sphinx: &quot; A wrong answer will hurt Oedipus. You can only miss 5 questions before Oedipus has to turn around. Click 'Start' to play. !&quot;"
					}
				});
			}.bind(this), 3000);
		});
	}

	// When the start/reset or gametype is changed,
	// this receives the props and set the state of playing (t/f) 
	// and gametype to find the appropriate info from db
	componentWillReceiveProps(nextProps){
		console.log("nextProps", nextProps);
		this.setState({
			playing: nextProps.playing, 
			gametype: nextProps.gametype
		}, function(){
			this.handleAPI();
			this.startGame();
		}.bind(this)); 
	}

	//this looks at the gametype state and find the right set of questiosn
	handleAPI(){
		this.setupGameType();
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
		// else if (this.state.gametype === "whichperiodisthisfrom"){
		// 	gameAPI.getSpecificQuestions(this.state.gametype).then(function(questions){
		// 		console.log(" quoteAPI:", questions);
		// 		this.setState({
		// 			questionBank: questions.data.specificQuestions
		// 		}, function () {
		// 			console.log("THIS.STATE", this.state);
		// 		});
		// 	}.bind(this));
		// } 
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
		var theRightAns = this.state.currentQuestion.answer.trim().toLowerCase();
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
					if ((this.state.currentIndex) < (this.state.questionBank).length && this.state.life > 0) {
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
						if ((this.state.currentIndex) < (this.state.questionBank).length && this.state.life > 0) {
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
						currentQuestion: {
							question: "Collecting questions...", 
							life: 5
						}
					}, function () {
						this.setState({
							currentQuestion: this.state.questionBank[this.state.currentIndex], 
							timer: true
						});
					}.bind(this));
				}.bind(this), 1200);	
			}
		} else if (this.state.playing === false){
			this.setState({
				currentQuestion: {
					question: "Click &quot;Start&quot; to play.",
					life: 5
				}
			});
		} else if (this.state.playing === ''){
			this.resetGame();
		}
	}
	
	endGame(){
		this.setState({
			currentQuestion: {
				question: "End of game",
				author: ''
			},
			matched: "",
			sphinxSrc: sphinx,
			oedipus: oedipus,
			feedback: "",
			timer: false,
			playing: false,
			currentIndex: 0, 
			gametype:""
		});
	}

	setupGameType(){
		this.setState({
			currentQuestion: {
				question: "Collecting questions...", 
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
			this.setState({
				currentQuestion: this.state.questionBank[this.state.currentIndex]
			});
		}.bind(this));
	}
	resetGame(){
		this.setState({
			playing: false,
			currentQuestion: {
				question: "Resetting Game..."
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
				<div className="row">
					<div className="col-lg-5 talk-bubble tri-right border round btm-left-in">
						<div className="talktext">
							<p>{this.state.currentQuestion.question}</p>
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
							<label htmlFor="">{this.state.currentQuestion.gametype}</label><br />
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