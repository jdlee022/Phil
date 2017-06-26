import React, { Component } from 'react';


import './style.css';
import teaser from './teaser.png';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="col-md-6 col-md-offset-3 text-center">
                    <img src={teaser} alt="teaser" className="teaser" />
                </div>
            </div>
        );
    }
}

