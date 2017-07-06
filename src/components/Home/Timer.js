import React, { Component } from 'react'

export default class Timer extends Component {

	constructor() {
		super();
		// This is called before our render function. The object that is 
		// returned is assigned to this.state, so we can use it later.
		this.state = { 
			elapsed: 0, 
			start: 0
		};
		this.tick = this.tick.bind(this);
	}

	componentDidMount() {
		// componentDidMount is called by react when the component 
		// has been rendered on the page. We can set the interval here:
		this.timer = setInterval(this.tick, 1000);
	}

	componentWillUnmount() {
		// This method is called immediately before the component is removed
		// from the page and destroyed. We can clear the interval here:
		clearInterval(this.timer);
	}

	tick() {
		// This function is called every 50 ms. It updates the 
		// elapsed counter. Calling setState causes the component to be re-rendered
		if (this.state.elapsed >= 0){
			this.setState({
				elapsed: this.state.start - new Date()
			}, function(){
				var totalInSecond = Math.round(this.state.elapsed / 1000);
				this.props.checkTime(totalInSecond);
			}.bind(this));
		} 
		else if (this.state.elapsed < 0 ){
			this.setState({
				elapsed: 0
			}, function(){
				var totalInSecond = Math.round(this.state.elapsed / 1000);
				this.props.checkTime(totalInSecond);
			}.bind(this));	
		}		
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			start: nextProps.start
		});
	}

	render() {
		// Calculate elapsed to tenth of a second:
		var totalInSecond = Math.round(this.state.elapsed / 1000);

		var hour = Math.floor(this.state.elapsed / (60 * 60 * 1000));

		var minute = Math.floor(totalInSecond / 60 - hour * 60);

		var second = totalInSecond - (minute * 60 + hour * 60 * 60);
		// This will give a number with one digit after the decimal dot (xx.x):
		// var seconds = (elapsed / 10).toFixed(1);    

		// Although we return an entire <p> element, react will smartly update
		// only the changed parts, which contain the seconds variable.

		return <p><b> {hour} hour : {minute} minute : {second} seconds, </b> </p>;
	}
};