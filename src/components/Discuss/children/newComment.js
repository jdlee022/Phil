/**
 * @file - manages a single comment list element that
 * is displayed in the PostPage view.
 */
import React, { Component } from 'react';
import API from '../../../utils/API';

export default class NewComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
            userId: this.props.userId,
            text: '',
            date: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    /** Display an error message if the user tries to comment without logging in. */
    checkLoginStatus() {
        if (!this.props.loginStatus) {
            return <p className="warning">You must be logged in to comment.</p>;
        }
    }

    /**
     * Submits a request to post a new comment if a user is logged in.
     */
    handleCommentSubmit() {
        // Check if user is logged in before comment submit
        if (this.props.loginStatus) {
            var date = new Date();
            date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " @ " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            API.newComment({
                post: this.state.postId,
                user: this.state.userId,
                text: this.state.text,
                date: date
            }).then((response) => {
                //when we are done submitting the new comment then tell the parent (PostPage)
                this.props.updateCommentingStatus(false);
            });

        }
    }

    render() {

        return (
            <div>
                {this.checkLoginStatus()}
                <input type="text" className="form-control" name="text" value={this.state.text} onChange={this.handleInputChange} />
                <button type="button" className="btn btn-default" onClick={this.handleCommentSubmit}>Submit</button>
            </div>
        );
    }
}