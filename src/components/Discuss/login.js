import React, { Component } from 'react';

import './style.css';

export default class UserLogin extends Component {

	render() {
		return (
			<div className="">
				<div className="col-md-6 col-md-offset-3 text-center">
                    <h2 className="page-header">Account Login</h2>
                    <form method="post" action="/users/login">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn -default">Submit</button>
                    </form>
				</div>
			</div>
		);
	}
}