/**
 * @file manages the component that renders a form for users to submit
 * a new Post within a Category if they are logged in.
 * Accessed via react-router
 * 
 * @author Jon Lee, 7/3/17
 */
import React from 'react';
import API from '../../utils/API';

export default class NewPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: this.props.params.category,
            title: '',
            text: '',
            date: '',
            userId: null,
            username: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Set state with result from API after component mounts
    componentDidMount() {
        // Get the current date and time
        var date = new Date();
        date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " @ " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        this.setState({
            date: date
        });
        // If user is logged in then set localStorage with user's info
        if (this.props.loginStatus === true) {
            this.setState({
                userId: localStorage.getItem('userId'),
                username: localStorage.getItem('username')
            });
        }
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
        var newPost = {
            category: this.state.category,
            title: this.state.title,
            text: this.state.text,
            date: this.state.date,
            userId: this.state.userId,
            username: this.state.username
        };

        //If the user is logged in, save a new post and then navigate to that post's route
        if (this.props.loginStatus) {
            API.newPost(newPost).then(function (response) {
                var postQuery = '/post/' + response.data._id;
                this.props.router.push({ pathname: postQuery });
            }.bind(this));
        }
    }

    render() {
        
        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <h2 className="page-header">Create a new post in {this.state.category}</h2>
                </div>
                {this.props.loginStatus && <div className="col-md-offset-1 col-md-10">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Post Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Post Text</label>
                            <textarea style={{ height: '200px' }} type="text" className="form-control" name="text" value={this.state.text} onChange={this.handleInputChange} />
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>}
            </div>
        );
    }
}