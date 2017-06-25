import React, { Component } from 'react';
import Navbar from '../Navbar/';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />

                <div className="col-md-6 col-md-offset-3 text-center">
                    <h1>Home</h1>
                </div>
            </div>
        );
    }
}

export default App;