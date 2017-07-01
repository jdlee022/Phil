import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CategoryChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.data._id,
            topic: this.props.data.topic,
            description: this.props.data.description,
            posts: this.props.data.posts,
            numPosts: this.props.data.posts.length

        };
    }

    render() {
        var topicQuery = "/topic/" + this.state.topic;

        return (
            <li className="row">
                <div className="col-md-3 text-center">
                    <Link to={topicQuery}>{this.state.topic}</Link>
                </div>
                <div className="col-md-8 text-center">
                    <p>{this.state.description}</p>
                </div>
                <div className="col-md-1 text-center">
                    <p>{this.state.numPosts}</p>
                </div>
            </li>
        );
    }
}