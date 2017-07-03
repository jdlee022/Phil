/**
 * @file - the default view when navigating to /discuss. Gets list of 
 * categories from the database and generates an unordered list 
 * of CategoryChildren from /children/category-child
 */
import React, { Component } from 'react';
import CategoriesChild from './children/categoriesChild';
import API from '../../utils/API';

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };

        // Get categories from db and set state
        API.getCategories().then((response) => {
            this.setState({ categories: response.data });
        });
    }

    render() {
        // Create an array of CategoryChild components for every item in categories
        // and pass each child its category data
        const categoryItems = this.state.categories.map((category, i) =>
            <CategoriesChild data={category} key={i}/>
        );

        return (
            <div>
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