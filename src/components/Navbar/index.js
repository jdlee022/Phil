import React, { Component } from 'react';
import { Link } from 'react-router';

import './style.css';
import logo from './phil.gif';

export default class Navbar extends Component {

    render() {
        return (
            <div className="nav">
                <div className="col-md-2 col-md-offset-1 text-center">
                    <Link to='/' className="link">Home</Link>
                </div>
                <div className="col-md-2 text-center">
                    <Link to='/discuss' className="link">Discuss</Link>
                </div>
                <div className="col-md-2 text-center">
                    <img src={logo} alt="logo" className="logo"/>
            </div>
                <div className="col-md-2 text-center">
                    <Link to='/explore' className="link">Explore</Link>
                </div>
                <div className="col-md-2 text-center">
                    <Link to='/game' className="link">Play</Link>
                </div>
            </div>
        );
    }
}


