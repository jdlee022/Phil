import React, { Component } from 'react';
import Navbar from '../Navbar/index';

import Play from './children/Play';
import Control from './children/Control';

import './style.css';

export default class Game extends Component {

    render() {
        return (
            <div className="">
                <Navbar />

                <div className="col-md-6 col-md-offset-3 text-center">
                    <h1>Game</h1>

					
                </div>

				<div className="container">
					<Control />
					<br/>
					<Play />
				</div>
				
            </div>
        );
    }
}