/**
 * @file - manages a single category list element that is created in categoriesList.js
 * Rendered in categoriesList.js
 * 
 */
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CategoriesListChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.data._id,
            category: this.props.data.category,
            description: this.props.data.description,
            posts: this.props.data.posts,
            numPosts: this.props.data.posts.length
        };
    }

    render() {
        //the route that we want to go to when a use clicks on a category title
        var categoryQuery = "/category/" + this.state.category;

        return (
            <Link to={categoryQuery}>
            <li className="row categoryListChild">
                    <div className="col-md-2 col-xs-3 link">
                        {this.state.category}
                    </div>
                    <div className="col-md-8 col-xs-8">
                        <p>{this.state.description}</p>
                    </div>
                    <div className="col-md-2 col-xs-1 text-center">
                        <p className="category-posts">{this.state.numPosts}</p>
                    </div>
            </li>
            </Link>
        );
    }
}