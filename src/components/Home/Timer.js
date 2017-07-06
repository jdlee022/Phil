import React, {Component} from 'react'
import moment from 'moment'

export default class Timer extends Component {
	constructor(props){
		super(props);
		this.state = {
			time: props.time,
			now: 0
		}

		this.start = this.start.bind(this);
		this.displayHour = this.displayHour.bind(this);
		this.displayMin = this.displayMin.bind(this);
		this.displaySec = this.displaySec.bind(this);
	}
	
	componentReceiveProps(nextProps){
		console.log("nextProps", nextProps);
		if (this.state.now !== nextProps.now){
			this.setState({
				now: nextProps.now
			});
			this.start();
			this.props.checkTime(this.state.time);
		}
	}

	start(){
		let thisSec = this.state.time.hour;
		let thisMin = this.state.time.minute;
		let thisHr  = this.state.time.hour;

		if (thisSec === 0 ){
			if (thisMin !== 0){
				thisMin--
				thisSec = 59
				this.setState({
					second: thisSec,
					minute: thisMin
				});
			} else if (thisMin === 0){
				if (thisHr === 0){
					this.setState({
						hour: 4,
						minute: 20,
						second: 0
					});
				} else if (thisHr !== 0) {
					thisHr--;
					this.setState({
						second: thisSec,
						minute: 59,
						hour: 59
					});
				}
			}
		} else {
			thisSec--;
			this.setState({
				second: thisSec
			});
		}
	}

	displayHour(){
		var hour = (this.state.time.hour);
		hour = JSON.stringify(hour);
		console.log(hour);
		while (hour.length < 2) {hour = "0" + hour}
		return hour;
	}

	displayMin() {
		var minute = (this.state.time.minute);
		minute = JSON.stringify(minute);
		console.log(minute);
		while (minute.length < 2) { minute = "0" + minute }
		return minute;
	}
	displaySec() {
		var second = (this.state.time.second);
		second = JSON.stringify(second);
		console.log(second);
		while (second.length < 2) { second = "0" + second }
		return second;
	}

	render(){
		return (
			<div>
				<h3>{this.displayHour()} : {this.displayMin()} : {this.displaySec()}</h3>
			</div>
		)
	}
}