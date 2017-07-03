/**
 * @file - manages a single comment list element that
 * is displayed in the PostPage view.
 * 
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
            username: ''
        };
        API.getUserById(this.props.data.user).then((response) => {
            this.setState({
                username: response.data.username
            })
        });
    }

    render() {

        return (
            <li className="row">
                <div className="col-md-12 " style={{ background: '#11004d', margin: '10px' }}>
                    <h4>{this.state.title}</h4>
                    <p>By {this.state.username} on {this.state.date}</p>
                    <p>{this.state.text}</p>
                </div>
            </li>
        );
    }
}