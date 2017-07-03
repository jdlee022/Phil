/**
 * @file - manages a single post list element that
 * is displayed in the categoryPage view. Allows users to navigate
 * to a post by clicking on the title
 * 
 */
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CategoryPageChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.data._id,
            category: this.props.data.category,
            title: this.props.data.title,
            text: this.props.data.text,
            date: this.props.data.date,
            userId: this.props.data.userId,
            replies: 'todo', //this.props.data.comments.length,
            lastReply: 'todo',
            username: this.props.data.username

        };
    }

    render() {
        //the route that we want to go to when a use clicks on a category title
        var postQuery = "/post/" + this.state._id;

        return (
            <li className="row">
                <div className="col-md-6">
                    <Link to={postQuery}>{this.state.title}</Link>
                </div>
                <div className="col-md-3">
                    <p>{this.state.replies}</p>
                </div>
                <div className="col-md-3">
                    <p>{this.state.lastReply}</p>
                </div>
            </li>
        );
    }
}