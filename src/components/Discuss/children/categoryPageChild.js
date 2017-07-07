/**
 * @file - manages a single post list element that
 * is displayed in the categoryPage view. Allows users to navigate
 * to a post by clicking on the title.
 * Rendered in categoryPage.js
 * 
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import API from '../../../utils/API';

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
            replies: this.props.data.comments.length,
            lastReply: 'N/A',
            username: this.props.data.username
        };
    }

    // Set state with result from API after component mounts
    componentDidMount() {
        if (this.state.replies > 0) {
            API.getCommentById(this.props.data.comments[this.state.replies - 1]).then((response) => {
                this.setState({
                    lastReply: response.data.date
                });
            });
        }
    }

    render() {
        //the route that we want to go to when a use clicks on a category title
        var postQuery = "/post/" + this.state._id;

        return (
            <li className="row categoryTest">
                <div className="col-md-6">
                    <Link to={postQuery}>{this.state.title}</Link>
                    <p>By <span className="username">{this.state.username}</span> on {this.state.date}</p>
                </div>
                <div className="col-md-2 text-center">
                    <p>{this.state.replies}</p>
                </div>
                <div className="col-md-4 text-center">
                    <p>{this.state.lastReply}</p>
                </div>
            </li>
        );
    }
}