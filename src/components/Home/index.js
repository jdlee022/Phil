import React, { Component } from 'react'
import moment from 'moment'
import Timer from "./Timer";

import './style.css'
import teaser from './teaser.png'
import image1 from './images/om.gif'
import dailyQuoteAPI from "../../utils/dailyQuoteAPI"
// import Timer from './Timer.js'
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            quoteOfTheDay: {},
            quoteIndex: 0,
            allQuotes: [],
			time: (20 * 1000 + 4 * 60 * 1000 + 0 * 60 * 60 * 1000)

        }

        this.getDailyQuotes = this.getDailyQuotes.bind(this);
        this.displayTodayQuote = this.displayTodayQuote.bind(this);
        this.checkTime = this.checkTime.bind(this);
		this.changeQuote = this.changeQuote.bind(this);
    }

    componentDidMount() {
        console.log("this.state.now", this.state.now);
        this.getDailyQuotes();
    }

    getDailyQuotes() {
        dailyQuoteAPI.getQuotes().then(function (myDailyQuotes) {
            console.log("myDailyQuotes", myDailyQuotes);
            this.setState({
                allQuotes: myDailyQuotes.data.allQuotes
            }, function () {
                console.log("THIS.STATE:", this.state);
                this.setState({
                    quoteOfTheDay: this.state.allQuotes[this.state.quoteIndex]
                });
            }.bind(this));
        }.bind(this));
    }

    checkTime(time) {
		console.log(time);
		var countZero = 0;
		if (time == 0  || time == -0){
			countZero++;
		}
		if (countZero == 2 ){
			countZero = 0;
		} else if ( (time == 0 || time == -0) && countZero == 1){
			this.changeQuote();
		}
    }

	changeQuote(){
		console.log("this.changeQuote()");
		if (this.state.quoteIndex < ((this.state.allQuotes).length - 1)) {
			this.setState({
				quoteIndex: (this.state.quoteIndex + 1)
			}, function () {
				this.setState({
					quoteOfTheDay: this.state.allQuotes[this.state.quoteIndex]
				});
			}.bind(this));
		} else if (this.state.quoteIndex == ((this.state.allQuotes).length - 1)) {
			this.setState({
				quoteIndex: 0, 
				quoteOfTheDay: this.state.allQuotes[0]
			});
		}
	}

    displayTodayQuote() {
        console.log("quoteOfTheDay:", this.state.quoteOfTheDay);
        if (this.state.quoteOfTheDay.era && this.state.quoteOfTheDay.associatedIdeas) {
            return (
                <div className="quoteOfTheDay">
                    <h2>{this.state.quoteOfTheDay.quote}</h2>
                    <h3>- {this.state.quoteOfTheDay.philosopher} ({this.state.quoteOfTheDay.era})

					</h3>
                    <h4>Studied: {this.state.quoteOfTheDay.associatedIdeas}</h4>
                </div>
            )
        }
        if (this.state.quoteOfTheDay.era) {
            return (
                <div className="quoteOfTheDay">
                    <h2>{this.state.quoteOfTheDay.quote}</h2>
                    <h3>- {this.state.quoteOfTheDay.philosopher} ({this.state.quoteOfTheDay.era})
					</h3>
                </div>
            )
        }
        if (this.state.quoteOfTheDay.associatedIdeas) {
            return (
                <div className="quoteOfTheDay">
                    <h2>{this.state.quoteOfTheDay.quote}</h2>
                    <h3>- {this.state.quoteOfTheDay.philosopher}
                    </h3>
                    <h4>Studied: {this.state.quoteOfTheDay.associatedIdeas}</h4>
                </div>
            )
        } 
        else {
            return (
                <div className="quoteOfTheDay">
                    <h2>{this.state.quoteOfTheDay.quote}</h2>
                    <h3>- {this.state.quoteOfTheDay.philosopher}
                    </h3>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="home-container">
                    <h3 className="tagline">Welcome to phil, a hub for people who enjoy discussing and learning about philosophy.</h3>
                    <div className="quote-container">
                        <h4>Quote of the day:</h4>
                        {this.displayTodayQuote()}
                    </div>
					<div className="quoteTimer">
						<Timer 
							start={Date.now() + (this.state.time)}
							checkTime = {this.checkTime}
							time = {this.state.time}
						/>
					</div>
                </div>
            </div>
        );
    }
}

