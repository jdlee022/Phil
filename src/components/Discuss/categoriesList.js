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
        //Always sort categories alphabetically before rendering
        var sortedCategories = this.state.categories.sort(function (itemA, itemB) {
            var textA = itemA.category.toUpperCase();
            var textB = itemB.category.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        //Move the General category to the front of the array
        for (var i in sortedCategories) {
            if (sortedCategories[i].category === "General") {
                var element = sortedCategories[i];
                sortedCategories.splice(i, 1);
                sortedCategories.splice(0, 0, element);
            }
        }
        // Create an array of CategoryChild components for every item in categories
        // and pass each child its category data
        const categoryItems = sortedCategories.map((category, i) =>
            <CategoriesListChild data={category} key={i} />
        );

        return (
            <div className="categories-list">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 text-center">
                        <h2 className="page-header">Categories</h2>
                    </div>
                </div>
                <div className="discuss-content-block">
                    <div className="row">
                        <div className="col-md-2">
                            <h4><u>Category</u></h4>
                        </div>
                        <div className="col-md-8">
                            <h4><u>Description</u></h4>
                        </div>
                        <div className="col-md-2 text-center">
                            <h4><u>Posts</u></h4>
                        </div>
                    </div>
                    <div className="row">
                        <ul>
                            {categoryItems}
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}