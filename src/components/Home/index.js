import React, { Component } from 'react'
import moment from 'moment'

import './style.css'
import teaser from './teaser.png'
import image1 from './images/om.gif'
import dailyQuoteAPI from "../../utils/dailyQuoteAPI"
import Timer from './Timer.js'
export default class Home extends Component {
	constructor(){
		super();
		this.state = {
			quoteOfTheDay: {},
			quoteIndex: 0,
			allQuotes: [],
			now: moment(),
			nextTime: "",
			countdowntime: (4 * 60 * 60 * 1000 + 20 * 60 * 1000)
		}

		this.getDailyQuotes = this.getDailyQuotes.bind(this);
		this.displayTodayQuote = this.displayTodayQuote.bind(this);
		this.checkTime = this.checkTime.bind(this);
	}

	componentDidMount(){
		console.log("this.state.now",this.state.now);
		this.getDailyQuotes();
	}

	getDailyQuotes(){
		dailyQuoteAPI.getQuotes().then(function(myDailyQuotes){
			console.log("myDailyQuotes", myDailyQuotes);
			this.setState({
				allQuotes: myDailyQuotes.data.allQuotes
			}, function(){
				console.log("THIS.STATE:", this.state);
				this.setState({
					quoteOfTheDay: this.state.allQuotes[this.state.quoteIndex]
				});
			}.bind(this));
		}.bind(this));
	}

	//TODO:
	checkTime(){
		if (this.state.lastTime.from(this.state.now)){

		}
	}

	displayTodayQuote(){
		if (this.state.quoteOfTheDay){
			return (
				<div className="quoteOfTheDay">
					<h2>{this.state.quoteOfTheDay.quote}</h2>
					<h3>- {this.state.quoteOfTheDay.philosopher} (
					 {this.state.quoteOfTheDay.historicPeriod} -
					 {this.state.quoteOfTheDay.era}) -
					</h3>
				</div>
			)
		} else return;
	}

    render() {
        return (
            <div>
                <div className="container">
					{this.displayTodayQuote()}

					<div className="image">
						<img src={image1} alt="teaser" className="background" />
					</div>
					
                </div>
            </div>
        );
    }
}

