import React, { Component } from 'react';
import { Link } from 'react-router'
import quoteAPI from './utils/quoteAPI'

import './style.css';

export default class AddQuote extends Component {
	constructor(){
		super();
		this.state = {
			quote: "", 
			author: "", 
			posted: false
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.postSuccess = this.postSuccess.bind(this);
	}

	handleInput(event){
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit(event){
		event.preventDefault();
		var newQuote = {
			quote: this.state.quote,
			author: this.state.author
		};
		quoteAPI.addQuote(newQuote).then(function(){
			this.setState({
				quote: '',
				author:'', 
				posted: true
			});
		}.bind(this));
	}

	postSuccess(){
		if (this.state.posted === true){
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
						<label htmlFor="">Philosopher:</label>
						<input onInput={this.handleInput} type="text" name="author" value={this.state.author}/>
						<br/>
						<label htmlFor="">Quote:</label>
						<input onInput={this.handleInput} type="text" name='quote' value={this.state.quote}/>
						<input  type="submit" value="Submit"/>
						{this.postSuccess()}
					</form>
				</div>
			</div>
		);
	}
}