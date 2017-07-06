import React, { Component, cloneElement} from 'react';
import Navbar from '../Navbar/';

class Main extends Component {
	constructor(){
		super();
		this.state ={
			quoteIndex: 0,
			countDownTime: (20 * 1000 + 4 * 60 * 1000 + 0 * 60 * 60 * 1000)
		}
		this.checkTime = this.checkTime.bind(this);
		this.changeQuote = this.changeQuote.bind(this);
		this.getDailyQuotes = this.getDailyQuotes.bind(this);
		this.displayTodayQuote = this.displayTodayQuote.bind(this);
	}

	getDailyQuotes(){

	}

	displayTodayQuote(){
		
	}

	checkTime(time){
		console.log(time);
		var countZero = 0;
		if (time == 0 || time == -0) {
			countZero++;
		}
		if (countZero == 2) {
			countZero = 0;
		} else if ((time == 0 || time == -0) && countZero == 1) {
			this.changeQuote();
		}
	}

	changeQuote(){
		
	}

	render() {
		var childrenWithProps = React.cloneElement(this.props.children, {
			countDownTime: this.state.countDownTime, 
			
		});
		return (
			<div className="App">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
				<Navbar />
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Main;