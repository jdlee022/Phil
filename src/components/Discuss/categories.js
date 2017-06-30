import React, { Component } from 'react';

export default class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories: []
        };
    }
    //TODO: how to populate category table when /discuss route is hit?

	render() {
		return (
			<div className="">

				<div className="col-md-6 col-md-offset-3 text-center">
                    <h1>Categories</h1>
				</div>
			</div>
		);
	}
}