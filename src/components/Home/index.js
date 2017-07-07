import React, { Component } from 'react'
// import moment from 'moment'
// import Timer from "./Timer";

import './style.css'
// import teaser from './teaser.png'
// import image1 from './images/om.gif'
import dailyQuoteAPI from "../../utils/dailyQuoteAPI"
// import Timer from './Timer.js'
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            quoteOfTheDay: {},
            quoteIndex: 0,
            allQuotes: [],
			// time: (20 * 1000 + 0 * 60 * 1000 + 0 * 60 * 60 * 1000)

        }

        this.getDailyQuotes = this.getDailyQuotes.bind(this);
        this.displayTodayQuote = this.displayTodayQuote.bind(this);
		this.checkDate = this.checkDate.bind(this);
    }

    componentDidMount() {
        console.log("this.state.now", this.state.now);
        this.getDailyQuotes ();
		
    }

    getDailyQuotes() {
        dailyQuoteAPI.getQuotes().then(function (myDailyQuotes) {
            console.log("myDailyQuotes", myDailyQuotes);
            this.setState({
                allQuotes: myDailyQuotes.data.allQuotes
            }, function () {
                console.log("THIS.STATE:", this.state);
				this.checkDate();
            }.bind(this));
        }.bind(this));
    }

	checkDate(getQuoteFunct){
		var d = new Date();
		var newIndex = Math.floor(d.getDate() % (this.state.allQuotes).length);
		console.log("d: ", d);
		console.log("newIndex", newIndex);
		this.setState({
			quoteIndex: newIndex
		}, function(){
			this.setState({
				quoteOfTheDay: this.state.allQuotes[this.state.quoteIndex]
			});
		}.bind(this));
	}

    displayTodayQuote() {
        console.log("quoteOfTheDay:", this.state.quoteOfTheDay);
        if (this.state.quoteOfTheDay.era && this.state.quoteOfTheDay.associatedIdeas) {
            return (
                <div className="quoteOfTheDay">
                    <div className = "daily-quote">"{this.state.quoteOfTheDay.quote}"</div>
                    <div className = "quote-philosopher-name">- {this.state.quoteOfTheDay.philosopher} ({this.state.quoteOfTheDay.era}) </div>
                    <div className = "quote-studied">Studied: {this.state.quoteOfTheDay.associatedIdeas}</div>
                </div>
            )
        }
        if (this.state.quoteOfTheDay.era) {
            return (
                <div className="quoteOfTheDay">
                    <div className = "daily-quote">"{this.state.quoteOfTheDay.quote}"</div>
                    <div className = "quote-philosopher-name">- {this.state.quoteOfTheDay.philosopher} ({this.state.quoteOfTheDay.era})
					</div>
                </div>
            )
        }
        if (this.state.quoteOfTheDay.associatedIdeas) {
            return (
                <div className="quoteOfTheDay">
                    <div className = "daily-quote">"{this.state.quoteOfTheDay.quote}"</div>
                    <div className = "quote-philosopher-name">- {this.state.quoteOfTheDay.philosopher}
                    </div>
                    <h4>Studied: {this.state.quoteOfTheDay.associatedIdeas}</h4>
                </div>
            )
        } 
        else {
            return (
                <div className="quoteOfTheDay">
                    <div className = "daily-quote">"{this.state.quoteOfTheDay.quote}"</div>
                    <div className = "quote-philosopher-name">- {this.state.quoteOfTheDay.philosopher}
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="home-container">
                    <h3 className="tagline">Welcome to <span style={{color: "#ffd65f", fontStyle: 'oblique', fontWeight: '800'}}>phil</span>, a hub for people who enjoy discussing and learning about philosophy.</h3>
                    <div className="quote-container">
                        <div className = "quote-heading">Quote of the day:</div>
                        {this.displayTodayQuote()}
                    </div>
                </div>
            </div>
        );
    }
}

