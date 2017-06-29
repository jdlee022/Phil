import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../style.css'

export default class IntroLine extends Component {
	render(){
		return (
			<ReactCSSTransitionGroup
				transitionName="intro"
				transitionAppear={true}
				trnasitionLeave={true}
				transitionEnterTimeout={1500}
				transitionLeaveTimeout={1000}>
				<div>
					<p>Sphinx used to sit outside of Thebes, asking riddles to anyone who passed by. Only you can help Oedipus get back to his journey.</p>
					<br />
					<p>Collecting Quotes...</p>
				</div>
			</ReactCSSTransitionGroup>
		)

	}
}
