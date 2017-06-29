import React, { Component } from 'react';
import Navbar from '../Navbar/index';
import ExploreContent from "./ExploreContent";
import Timeline from "./Timeline";

import './style.css';

export default class Explore extends Component {

	render() {
		return (
			<div className="">
				<Timeline />
            </div>
        );
	}
}