import React, { Component } from 'react';
import Navbar from '../Navbar/';

import './style.css';
import teaser from './teaser.png';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />

                <div className="col-md-6 col-md-offset-3 text-center">
                    <img src={teaser} alt="teaser" className="teaser" />
                </div>
            </div>
        );
    }
}

export default App;