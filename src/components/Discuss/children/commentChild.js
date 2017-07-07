/**
 * @file - manages a single comment list element that
 * is displayed in the PostPage view.
 */
import React, { Component } from 'react';
import API from '../../../utils/API';

export default class CommentChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postTitle: this.props.postTitle,
            text: this.props.data.text,
            date: this.props.data.date,
            username: '',
            userScore: 0
        };
    }

    // Set state with result from API after component mounts
    componentDidMount() {
        API.getUserById(this.props.data.user).then((response) => {
            this.setState({
                username: response.data.username,
                userScore: response.data.highScore
            })
        });
    }

    render() {

        return (
            <li className="row">
                <div className="col-xs-11 comment-list-element">
                    <h1>RE: {this.state.postTitle}</h1>
                    <h2>By {this.state.username} on {this.state.date}</h2>
                    <h3>{this.state.username}'s high score: {this.state.userScore}</h3>
                    <h4 style={{whiteSpace: 'pre-wrap'}}>{this.state.text}</h4>
                </div>
            </li>
        );
    }
}