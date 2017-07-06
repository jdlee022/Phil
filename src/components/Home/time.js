// http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/

import React, { Component } from 'react'
// import moment from 'moment'
import moment from "moment-duration-format";

export default class TimerExample extends Component {

	constructor(props) {
		super(props);
		// This is called before our render function. The object that is 
		// returned is assigned to this.state, so we can use it later.

		this.state = {
			time: props.start
		}
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
		this.setState({ time: this.props.start - 1000 });
	}

	render() {

		// Calculate elapsed to tenth of a second:
		var currentTime = this.state.time

		// This will give a number with one digit after the decimal dot (xx.x):
		var display = moment().duration(currentTime, "seconds").format("hh:mm:ss");

		// Although we return an entire <p> element, react will smartly update
		// only the changed parts, which contain the seconds variable.

		return <p>Count down: <b>{display}</b></p>;
	}
}

// ReactDOM.render(
// 	<TimerExample start={Date.now()} />,
// 	document.getElementById('container')
// );
