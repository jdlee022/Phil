import React, { Component } from 'react';
import CategoryChild from './children/category-child';
import API from '../../utils/API';

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };

        // Get categories from db and set state
        API.getCategories().then((response) => {
            console.log("categories retrieved from db:", response.data);
            this.setState({ categories: response.data });
        });
    }

    render() {
        const categoryItems = this.state.categories.map((category) =>
            <CategoryChild data={category} />
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