import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {

    render() {
        return (
            <div>
                <div className="col-md-2 col-md-offset-1 text-center">
                    <Link to='/'>Home</Link>
                </div>
                <div className="col-md-2 text-center">
                    <Link to='/discuss'>Discuss</Link>
                </div>
                <div className="col-md-2 text-center">
                    Logo
            </div>
                <div className="col-md-2 text-center">
                    <Link to='/explore'>Explore</Link>
                </div>
                <div className="col-md-2 text-center">
                    <Link to='/game'>Play</Link>
                </div>
            </div>
        );
    }
}


