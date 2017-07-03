/**
 * @file - manages a single post list element that
 * is displayed in the categoryPage view. Allows users to navigate
 * to a post by clicking on the title
 * 
 */
import React, { Component } from 'react';
import API from '../../utils/API';

export default class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.params._id,
            title: '',
            text: '',
            date: '',
            userId: '',
            username: '',
            comments: []
        };
        //get the rest of the post info from its id
        API.getPostById(this.state._id).then(function (response) {
            this.setState({
                title: response.data.title,
                text: response.data.text,
                date: response.data.date,
                userId: response.data.userId,
                username: response.data.username
            });
        }.bind(this));;
    }

    render() {

        return (
            <div className="row">
                <p>author: {this.state.username}</p>
                <p>date: {this.state.date}</p>
                <p>title: {this.state.title}</p>
                <p>text: {this.state.text}</p>
            </div>
        );
    }
}