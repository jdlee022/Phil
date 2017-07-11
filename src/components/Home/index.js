/**
 * @file - manages the component in charge of rendering the home page. Gets the 
 * quote of the day from the DB via our axios driven api.
 */
import React, { Component } from 'react';

import './style.css';

import dailyQuoteAPI from "../../utils/dailyQuoteAPI";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            quoteOfTheDay: {},
            quoteIndex: 0,
            allQuotes: []
        }

        this.displayTodayQuote = this.displayTodayQuote.bind(this);
        this.checkDate = this.checkDate.bind(this);
    }

    // After the constructor has executed, get all possible quotes of the day from DB
    componentDidMount() {
        dailyQuoteAPI.getQuotes().then(function (myDailyQuotes) {
            this.setState({
                allQuotes: myDailyQuotes.data.allQuotes
            }, function () {
                this.checkDate();
            }.bind(this));
        }.bind(this));
    }

    // Gets the current quote of the day based on current date
    checkDate(getQuoteFunct) {
        var d = new Date();
        var newIndex = Math.floor(d.getDate() % (this.state.allQuotes).length);
        this.setState({
            quoteIndex: newIndex
        }, function () {
            this.setState({
                quoteOfTheDay: this.state.allQuotes[this.state.quoteIndex]
            });
        }.bind(this));
    }

    // Determines how the quote is displayed based on available data for quote
    displayTodayQuote() {
        if (this.state.quoteOfTheDay.era && this.state.quoteOfTheDay.associatedIdeas) {
            return (
                <div className="quoteOfTheDay">
                    <div className="daily-quote">"{this.state.quoteOfTheDay.quote}"</div>
                    <div className="quote-philosopher-name">- {this.state.quoteOfTheDay.philosopher} ({this.state.quoteOfTheDay.era}) </div>
                    <div className="quote-studied">Studied: {this.state.quoteOfTheDay.associatedIdeas}</div>
                </div>
            )
        }
        if (this.state.quoteOfTheDay.era) {
            return (
                <div className="quoteOfTheDay">
                    <div className="daily-quote">"{this.state.quoteOfTheDay.quote}"</div>
                    <div className="quote-philosopher-name">- {this.state.quoteOfTheDay.philosopher} ({this.state.quoteOfTheDay.era})
					</div>
                </div>
            )
        }
        if (this.state.quoteOfTheDay.associatedIdeas) {
            return (
                <div className="quoteOfTheDay">
                    <div className="daily-quote">"{this.state.quoteOfTheDay.quote}"</div>
                    <div className="quote-philosopher-name">- {this.state.quoteOfTheDay.philosopher}
                    </div>
                    <h4>Studied: {this.state.quoteOfTheDay.associatedIdeas}</h4>
                </div>
            )
        }
        else {
            return (
                <div className="quoteOfTheDay">
                    <div className="daily-quote">"{this.state.quoteOfTheDay.quote}"</div>
                    <div className="quote-philosopher-name">- {this.state.quoteOfTheDay.philosopher}
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="home-container">
                    <h3 className="tagline">Welcome to <span style={{ color: "#ffd65f", fontStyle: 'oblique', fontWeight: '800' }}>phil</span>, a hub for people who enjoy discussing and learning about philosophy.</h3>
                    <div className="quote-container">
                        <div className="quote-heading">Quote of the day:</div>
                        {this.displayTodayQuote()}
                    </div>
                </div>
            </div>
        );
    }
}

