/**
 * @file - the default view when navigating to /discuss. Gets list of 
 * categories from the database and generates an unordered list 
 * of CategoryChildren from /children/category-child
 * Accessed via react-router, and is the default component when hitting /discuss
 */
import React, { Component } from 'react';
import CategoriesListChild from './children/categoriesListChild';
import API from '../../utils/API';

export default class CategoriesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    // Set state with result from API after component mounts
    componentDidMount() {
        // Get categories from db and set state
        API.getCategories().then((response) => {
            this.setState({ categories: response.data });
        });
    }

    render() {
        // Create an array of CategoryChild components for every item in categories
        // and pass each child its category data
        const categoryItems = this.state.categories.map((category, i) =>
            <CategoriesListChild data={category} key={i} />
        );

        return (
            <div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 text-center">
                        <h2 className="page-header">Categories</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 text-center">
                        <h4>Category</h4>
                    </div>
                    <div className="col-md-8 text-center">
                        <h4>Description</h4>
                    </div>
                    <div className="col-md-1 text-center">
                        <h4>Posts</h4>
                    </div>
                </div>
                <div className="row">
                    <ul >
                        {categoryItems}
                    </ul>
                </div>
            </div>
        );
    }
}