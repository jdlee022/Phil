/**
 * @file - manages a category page after the title was clicked on in the list of 
 * categories displayed when /discuss is hit. Displays a list of posts related
 * to the category
 */
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.params.category
        };

        //TODO: 
        // create a route to post a new thread to a category
        // make a post button
        // make an api call to populate threads based on category key
    }

    render() {
        // route to hit when user wants to create a new post for this category
        var newPostQuery = "/new_post/" + this.state.category;

        return (
            <div className="row">
                <div className="col-md-3">
                    <Link to={newPostQuery}>New Post</Link>
                </div>
                <div className="col-md-6 text-center">
                    <h3>{this.state.category}</h3>
                </div>
            </div>
        );
    }
}
