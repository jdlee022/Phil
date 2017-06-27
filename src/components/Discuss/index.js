import React, { Component } from 'react';
import { Link } from 'react-router';

import './style.css';

export default class Discuss extends Component {

	render() {
		return (
			<div>

                <div className="discussLinks col-md-8 col-md-offset-2 text-center" >
                    <Link to="/discuss">Dashboard </Link>
                    <Link to="/login" >Login </Link>
                    <Link to="/register" >Register</Link>
                </div>
				    <div className="">
					    {this.props.children}
				    </div>
			</div>
		);
	}
}