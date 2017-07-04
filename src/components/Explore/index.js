import React, { Component } from 'react';
import Navbar from '../Navbar/index';
import ExploreContent from "./ExploreContent";
import Timeline from "./Timeline";


import './style.css';

export default class Explore extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",

        };

        this.updateTitle = this.updateTitle.bind(this);        
    }

    updateTitle(newTitle) {
        this.setState({
            title: newTitle
        }, function(){
            console.log("newTitle: " + newTitle);
            console.log("this.state: " , this.state);
        });
    }

    render() {
        return (
            <div className="main-timeline-container">
                 <ExploreContent currentTitle = {this.state.title} />
                 <Timeline updateTitle = {this.updateTitle}/>
                 
                
            </div>
        );
    }
}