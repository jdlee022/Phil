/**
 * @file - manages a single post list element that
 * is displayed in the categoryPage view. Allows users to navigate
 * to a post by clicking on the title
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import API from '../../utils/API';
import CommentChild from './children/commentChild';

export default class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.params._id,
            category: '',
            title: '',
            text: '',
            date: '',
            userId: '',
            username: '',
            comments: [],
            currentlyCommenting: false,
            commentField: ''
        };
        //get the rest of the post info from its id
        API.getPostById(this.state._id).then(function (response) {
            this.setState({
                category: response.data.category,
                title: response.data.title,
                text: response.data.text,
                date: response.data.date,
                userId: response.data.userId,
                username: response.data.username
            });

        }.bind(this));

        API.getComments(this.state._id).then((response) => {
            this.setState({
                comments: response.data
            });
        });

        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkLoginStatus = this.checkLoginStatus.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handlePostReply = this.handlePostReply.bind(this);
        this.displayCommentOptions = this.displayCommentOptions.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    handlePostReply() {
        this.setState({
            currentlyCommenting: true
        });
    }

    handleCommentSubmit() {
        // Check if user is logged in before comment submit
        if (this.props.loginStatus) {
            var date = new Date();
            date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " @ " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            API.newComment({
                post: this.state._id,
                user: this.state.userId,
                text: this.state.commentField,
                date: date
            }).then((response) => {
                API.getComments(this.state._id).then((response) => {
                    this.setState({
                        comments: response.data
                    });
                });
            });

            this.setState({
                currentlyCommenting: false
            });
        }
    }

    /** Display an error message if the user tries to comment without logging in. */
    checkLoginStatus() {
        if (!this.props.loginStatus) {
            return <div>
                <p style={{ color: 'red' }}>You must be logged in to comment.</p>
            </div>
        }
    }

    displayCommentOptions() {
        if (this.state.currentlyCommenting) {
            return <div>
                {this.checkLoginStatus()}
                <input type="text" className="form-control" name="commentField" value={this.state.commentField} onChange={this.handleInputChange} />
                <button type="button" className="btn btn-default" onClick={this.handleCommentSubmit}>Submit</button>
                <a onClick={() => this.setState({ currentlyCommenting: false })}>Cancel</a>
            </div>

        }
        else {
            return <button type="button" className="btn btn-default" onClick={this.handlePostReply}>Post Reply</button>;
        }
    }

    render() {
        var categoryQuery = "/category/" + this.state.category;

        var postItems = this.state.comments.map((comment, i) =>
            <CommentChild data={comment} postTitle={this.state.title} key={i} />
        );

        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <Link to={categoryQuery}>{this.state.category}</Link>
                </div>
                <div className="col-md-12 " style={{ background: 'grey', margin: '10px' }}>
                    <h4>{this.state.title}</h4>
                    <p>By {this.state.username} on {this.state.date}</p>
                    <p>{this.state.text}</p>
                </div>
                {this.displayCommentOptions()}
                <ul>
                    {postItems}
                </ul>
            </div>
        );
    }
}