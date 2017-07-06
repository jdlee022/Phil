/**
 * @file - manages a category page after the title was clicked on in the list of 
 * categories displayed when /discuss is hit. Displays a list of posts related
 * to the category.
 * Accessed via react-router
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import CategoryPageChild from './children/categoryPageChild';
import API from '../../utils/API';


export default class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.params.category,
            posts: []
        };
    }

    // Set state with result from API after component mounts
    componentDidMount() {
        // Get categories from db and set state
        API.getPosts(this.state.category).then((response) => {
            this.setState({ posts: response.data });
        });
    }

    render() {
        // route to hit when user wants to create a new post for this category
        var newPostQuery = "/new_post/" + this.state.category;

        const postItems = this.state.posts.map((post, i) =>
            <CategoryPageChild data={post} key={i} />
        );

        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <button className="btn btn-default new-post-btn"><Link to={newPostQuery}>new post</Link></button>
                    </div>
                    <div className="col-md-6 text-center">
                        <h2 className="page-header">{this.state.category}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        Posts
                    </div>
                    <div className="col-md-3">
                        Replies
                    </div>
                    <div className="col-md-3">
                        Last Post
                    </div>
                </div>
                <div className="row">
                    <ul >
                        {postItems}
                    </ul>
                </div>
            </div>
        );
    }
}
