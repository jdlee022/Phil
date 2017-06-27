import React, { Component } from 'react';

import './style.css';

export default class UserRegister extends Component {

	render() {
		return (
			<div className="">
				<div className="col-md-6 col-md-offset-3 text-center">
                    <h2 className="page-header">Regiser</h2>
                    <form method="post" action="/register">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name" name="name" />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Username" name="username"/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Email" name="email"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" name="password"/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" placeholder="Password" name="password2"/>
                        </div>
                        <button type="submit" className="btn -default">Submit</button>
                    </form>
				</div>
			</div>
		);
	}
}