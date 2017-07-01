import React, { Component } from 'react';
// import { Link } from 'react-router'
// import quoteAPI from './utils/quoteAPI'

import gameAPI from './utils/gameAPI'

import './style.css';

export default class AddQuote extends Component {
	constructor(){
		super();
		this.state = {
			question: "", 
			answer: "", 
			gametype: "",
			posted: false
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.postSuccess = this.postSuccess.bind(this);
		this.handleSelect = this.handleSelect.bind(this);

	}

	//Handle any input field 
	handleInput(event){
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	//handle select the game type and pass this to the parent (index.js) --> (play.js)
	handleSelect(event){
		console.log("select event", event.target);
		this.setState({
			[event.target.name]: event.target.value
		}, function(){
			console.log("this.state.gametype", this.state.gametype);
		});

	}

	//When submit, this would post to the database name 'gameset'
	handleSubmit(event){
		event.preventDefault();
		var newQuestion = {
			question: this.state.question,
			answer: this.state.answer, 
			gametype: this.state.gametype
		};
		gameAPI.addQuestion(newQuestion).then(function(){
			this.setState({
				question: '',
				answer:'', 
				gametype: '',
				posted: true
			});
		}.bind(this));
	}

	//Supposed to tell me when my quote have saved. 
	postSuccess(){
		if (this.state.posted === true){
			this.setState({
				posted: false
			});
			return (
				<p>Your quote has been saved</p>
			)
		}
	}

	
	render() {
		return (
			<div>
				<div className="">
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="">Hint:</label>
						<input onInput={this.handleInput} type="text" name="question" value={this.state.question}/>
						<br/>
						<label htmlFor="">Answer:</label>
						<input onInput={this.handleInput} type="text" name='answer' value={this.state.answer}/>
						<label htmlFor="">Type Question:</label>
						<select onChange={this.handleSelect} name="gametype" id="">
							<option selected="selected" value="Select the type of game"></option>
							<option value="Which period is this from?">Which period is this from?</option>
							<option value="Who says this?">Who says this?</option>
						</select>
						<input  type="submit" value="Submit"/>
					</form>
					{this.postSuccess()}
				</div>
			</div>
		);
	}
}