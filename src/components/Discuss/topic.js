import React, { Component } from 'react';

export default class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: this.props.params.topic
        };
        console.log("props received in topic.js:", this.props.params);

        //TODO: 
        // create a route to post a new thread to a category
        // make a post button
        // make an api call to populate threads based on topic key
    }

    render() {
        return (
            <div className="row">
                <h2>{this.state.topic}</h2>
            </div>
        );
    }
}

var styles = {

};