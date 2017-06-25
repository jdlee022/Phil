import React, { Component } from 'react';
import Navbar from '../Navbar/index';

import './style.css';

export default class Game extends Component {

    render() {
        return (
            <div className="">
                <Navbar />

                <div className="col-md-6 col-md-offset-3 text-center">
                    <h1>Game</h1>
                </div>
            </div>
        );
    }
}