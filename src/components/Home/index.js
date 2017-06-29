import React, { Component } from 'react';


import './style.css';
import teaser from './teaser.png';
import image1 from './images/IMG_1693.JPG';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <img src={image1} alt="teaser" className="teaser" />
                </div>
            </div>
        );
    }
}

