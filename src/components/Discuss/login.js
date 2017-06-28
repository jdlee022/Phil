import React, { Component } from 'react';
import API from '../../utils/API';
import './style.css';

export default class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginFailed: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Detects when a change is made in an input field and 
     * updates the corresponding state prop
     */ 
    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    /**
     * Submits a request to post a new user to the database.
     * If there was an error then the state is updated and the view
     * is rendered to indicate what went wrong.
     */
    handleSubmit(event) {
        event.preventDefault();
        API.userLogin({
            username: this.state.username,
            password: this.state.password,
        }).then(function (response) {
            // if login was a success then redirect to /discuss route
            console.log("response from post in login component:", response);
            if(response.data.success){
                this.props.router.push('/discuss');
            }
            else{
                //FIXME: Never gets called because the request fails.
                //Need to figure out a way to notify user of failed login
                console.log("login failed");
                this.setState({loginFailed: true});
            }
        }.bind(this));;
    }

	render() {
		return (
			<div className="">
				<div className="col-md-6 col-md-offset-3 text-center">
                    <h2 className="page-header">Account Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleInputChange} />
                        </div>
                        <button type="submit" className="btn -default">Submit</button>
                    </form>
				</div>
			</div>
		);
	}
}