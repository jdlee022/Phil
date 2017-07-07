/**
 * @file - manages a PostPage that contains the original post and a list of comments
 * other users have posted.
 * Navigated to via react-router by clicking on link in categoryPageChild.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import API from '../../utils/API';
import CommentChild from './children/commentChild';
import NewComment from './children/newComment';

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
            userScore: 0,
            comments: [],
            currentlyCommenting: false
        };
        this.handlePostReply = this.handlePostReply.bind(this);
        this.displayCommentOptions = this.displayCommentOptions.bind(this);
        this.updateCommentingStatus = this.updateCommentingStatus.bind(this);
    }

    // Set state with result from API after component mounts
    componentDidMount() {
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
            API.getUserById(this.state.userId).then((response) => {
                this.setState({
                    userScore: response.data.highScore
                });
            });
        }.bind(this));



        API.getComments(this.state._id).then((response) => {
            this.setState({
                comments: response.data
            });
        });
    }

    /**
     * Passed to newComment to update this states commenting status after a 
     * new comment has been submitted
     * @param status - changes our state property that indicates whether a user is commenting 
     */
    updateCommentingStatus(status) {
        // Check for new comments and update commenting Status
        API.getComments(this.state._id).then((response) => {
            console.log("response from getComments:", response);

            this.setState({
                comments: response.data,
                currentlyCommenting: status
            });
        });
    }

    /**
     * When a user wants to submit a new comment to the post
     * toggle the var that triggers the NewComment to render via 
     * the displayCommentOptions func
     */
    handlePostReply() {
        this.setState({
            currentlyCommenting: true
        });
    }

    /**
     * Renders either a button that gives the users an option to reply to the post 
     * or a NewComment that displays the comment text box and submit button after
     * the button was pressed
     */
    displayCommentOptions() {
        if (this.state.currentlyCommenting) {
            return <div style={{ marginBottom: '30px' }}>
                <NewComment postId={this.state._id} userId={this.state.userId} loginStatus={this.props.loginStatus} updateCommentingStatus={this.updateCommentingStatus} />
                <a style={{ cursor: 'pointer' }} onClick={() => this.setState({ currentlyCommenting: false })}>Cancel</a>
            </div>
        }
        else {
            return <button style={{ marginTop: '0px', marginLeft: '0px' }} type="button" className="btn btn-default" onClick={this.handlePostReply}>Post Reply</button>;
        }
    }

    render() {
        var categoryQuery = "/category/" + this.state.category;

        var commentItems = this.state.comments.map((comment, i) =>
            <CommentChild data={comment} postTitle={this.state.title} key={i} />
        );

        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3 text-center">
                    <h2 className="page-header"><Link to={categoryQuery}>{this.state.category}</Link></h2>
                </div>
                <div className="col-xs-12">
                    <div className=" comment-list-element op">
                        <h1 className="op-title">{this.state.title}</h1>
                        <h2>By <span className="username">{this.state.username}</span> on {this.state.date}</h2>
                        <h3>{this.state.username}'s high score: {this.state.userScore}</h3>
                        <h4 style={{ whiteSpace: 'pre-wrap' }}>{this.state.text}</h4>
                    </div>
                    {this.displayCommentOptions()}

                    <ul>
                        {commentItems}
                    </ul>
                </div>
            </div>
        );
    }
}