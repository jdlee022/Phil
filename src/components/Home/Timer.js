import React, {Component} from 'react'
import moment from 'moment'

export default class Timer extends Component {
	constructor(){
		super();
		this.state = {
			hour: 4,
			minute: 20, 
			second: 0
		}
	}

	start(){
		let thisSec = this.state.second;
		let thisMin = this.state.minute;
		let thisHr  = this.state.hour;

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
}