
import React, {Component} from 'react'
import philData from './exploreData.json'
import style from './exploreContentStyle.css'

var $ = require('jquery');
// var React = require("react");
// var philData = require('./exploreData.json');
// var style = require('./exploreContentStyle.css');

// const h1Style = {
//     color:"white"
// }
const contentStyle = {
    border: "1px solid white",
    textAlign: "center",
    maxHeight: "75%",
    position: "absolute",
    left: "17vw",
    top: "14vh",
    overflowY: "auto",
    bottom: "22vh",
    borderRadius: "4px"

}
const philospherLink = {
    listStyleType: "none"
}

export default class ExploreContent extends Component {
    
    constructor(){
		super();
        this.state = {
            title: "",
            summary: "",
            philosophers: [],
            details: [],
        }

		this.findMatchingTitle = this.findMatchingTitle.bind(this);
		this.renderPhilosophers = this.renderPhilosophers.bind(this);
		this.renderDetails = this.renderDetails.bind(this);
        this.checkEmpty = this.checkEmpty.bind(this);

    }
    
    // 
    componentWillReceiveProps(nextProp){
        this.setState({
            title: nextProp.currentTitle
        }, function(){
			this.findMatchingTitle();
            console.log("ExploreContent this.state.title: " , this.state.title);
        });
    }

    findMatchingTitle(){
		console.log("findMatchingTitle");
     // Uses jQuery to get the data from the exploreData.json file
		var exploreData = $.getJSON("exploreData.json", function(data){
			// contentObject is an object (obviously) that contains all data from the exploreData.JSON
			console.log("getJSON()");
			var contentObject = data.data;
			// Create two empty arrays that will be populated with info once a correct match is found
			var philosophersArray = [];
			var detailsArray = [];
			
			// Loop through contentObject which contains JSON data with all philosophy content info
			for (var i = 0; i < contentObject.length; i++) {
				// Searches for a match, with the unique identifier being title of time period
				if (contentObject[i].Title == this.state.title){
					
					// If the title matches, set the state of summary to the matching summary in currentObject
					this.setState({
						summary: contentObject[i].Summary
					});

					// Loop through all philosophers in the contentObject object
					for( let [key, value] of Object.entries(contentObject[i].Philosophers)) {
					// "key" is the property while "value" is... you get it
		
					// Push each philosopher from the contentObject's
						philosophersArray.push(value);
					}
					// Set the state of philosopher equal to the array generated from above, containing a list of philosophers
					this.setState({
						philosophers : philosophersArray
					});
					
					// Loop through the details in contentObject and push to temporary variable "detailsArray"
					for( let [key, value] of Object.entries(contentObject[i].Details )) {
						// Will create array with as many indices as there are paragraphs
						detailsArray.push(value);
					}
					// Update this.state.details with entire array of detailed paragraphs
					this.setState({
						details: detailsArray
					});
					// Render the updated title to DOM
					this.renderPhilosophers();
					// Render updated details to DOM
					this.renderDetails();
				}
			}
		}.bind(this)
      )
    }

    renderPhilosophers() {
        // Loop through the exploreObject philosophers object
		// if (this.state.philosophers !== [] ){
			return this.state.philosophers.map(function(name, index){
				// Dynamically creates links to Wikipedia page of philosopher
				var thisAnchor = "https://en.wikipedia.org/wiki/" + name;
				// Removes spaces from url if the Philosopher is referred to as both first and last name
				thisAnchor.replace(/\s/g, '');
				// Render anchor tag for each philosopher inside of map function
				return (
					<ul id = "philospher-list">
						<div key={index}>
							<li>
								<a href = {thisAnchor} target="_blank" id = "philosopher-item"> {name} </a>
							</li>
						</div>
					</ul>
				)
			})
		// }
    }

    renderDetails(){
        // Loop through each property/value in details object
		// if (this.state.details !== []){
			return this.state.details.map( function(details, index){
				console.log("index: " + index +  ", details: " + details);
				// Will be used to create a unique identifier for each details paragraph
				var thisKey = "details-" + index;
				// Render details, with each paragraph inside it's own p tag
				return (
					<div class = "details" id = {thisKey}>
						<p>&nbsp; &nbsp; &nbsp;{ details } </p>
					</div>
				)
			});
		// }
    }

    checkEmpty() {
        console.log("checkEmpty this.state.summary: " + this.state.summary);
            if (this.state.summary == ""){
                console.log("Empty");
            return (
          <div className = "empty-container">
            <div className = "row">
                    
                <div className = "col-xs-2">
                </div>

                <div className = "col-xs-8" id = "content-container">
                  <div className = "explore-title">
                    <h1>Explore Content </h1>
                  </div>
                  <div className = "emptyContent">
                    <h4> Click on the timeline buttons on the bottom to learn more about each period </h4>
                  </div>
                  </div>

                <div className = "col-xs-2">
                </div>
            </div>

          </div>
          
            )
        }
        else {
            return(
              <div className = "content-container">
                <div className = "row">
                </div>
                <div className = "col-md-2">
                </div>

                <div className = "col-md-8" id = "content-container">
                    <div className = "explore-title"> 
                      <h1 className = "title">{this.state.title}</h1>
                      <h4 className = "content-summary"> {this.state.summary} </h4>
                      <h4 id = "prominent-philosopher-title">Prominent Philosophers: </h4>
                      {this.renderPhilosophers()}
                        <div className = "details-container">
                          {this.renderDetails() }
                        </div>
                    </div>
                </div>

                <div className = "col-md-2">
                </div>
                </div>
              
            )
        }
    }

    render(){
        console.log("this.state.summary: " + this.state.summary);
            return this.checkEmpty(); 
        }
    }
