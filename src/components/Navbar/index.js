/**
 * @file - manages the navigation bar that is rendered at the top of every page.
 * This component is imported into the Main component.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';

import './style.css';
import logo from './phil.gif';

export default class Navbar extends Component {

    render() {
        return (
            <div className="nav">
                <div className="col-xs-2 col-xs-offset-1 text-center">
                    <Link to='/' className="link">Home</Link>
                </div>
                <div className="col-xs-2 text-center">
                    <Link to='/discuss' className="link">Discuss</Link>
                </div>
                <div className="col-xs-2 text-center">
                    <Link to='/' ><img src={logo} alt="logo" className="logo"/></Link>
            </div>
                <div className="col-xs-2 text-center">
                    <Link to='/explore' className="link">Explore</Link>
                </div>
                <div className="col-xs-2 text-center">
                    <Link to='/game' className="link">Challenge</Link>
                </div>
            </div>
        );
    }
}


