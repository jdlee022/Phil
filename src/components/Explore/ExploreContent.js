var $ = require("jquery");
var React = require("react");
var philData = require('./exploreData.json');
var style = require('./exploreContentStyle.css');

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

var ExploreContent = React.createClass({
    
    getInitialState: function() {
        return {
            title: "",
            summary: "",
            philosophers: [],
            details: [],
        }
    },
    
    // 
    componentWillReceiveProps: function(nextProp){
        
        this.setState({
            title: nextProp.currentTitle
        }, function(){
            console.log("ExploreContent this.state.title: " , this.state.title);
        });
    },

    findMatchingTitle: function(){
     // Uses jQuery to get the data from the exploreData.json file
		$(function getData(){
			$.getJSON("exploreData.json",function(data){
            	// contentObject is an object (obviously) that contains all data from the exploreData.JSON
				var contentObject = data.data;
				// Create two empty arrays that will be populated with info once a correct match is found
				var philosophersArray = [];
				var detailsArray = [];
				
				// Loop through contentObject which contains JSON data with all philosophy content info
				for (var i = 0; i < contentObject.length; i++) {
					// Searches for a match, with the unique identifier being title of time period
					if (contentObject[i].Title == this.state.title){
						
						// If the title matches, set the state of summary to the matching summary in currentObject
						this.state.summary = contentObject[i].Summary;

						// Loop through all philosophers in the contentObject object
						for( let [key, value] of Object.entries(contentObject[i].Philosophers)) {
						// "key" is the property while "value" is... you get it
			
						// Push each philosopher from the contentObject's
						philosophersArray.push(value);
					}
						// Set the state of philosopher equal to the array generated from above, containing a list of philosophers
						this.state.philosophers = philosophersArray;
						
						// Loop through the details in contentObject and push to temporary variable "detailsArray"
						for( let [key, value] of Object.entries(contentObject[i].Details )) {
							// Will create array with as many indices as there are paragraphs
							detailsArray.push(value);
						}
						// Update this.state.details with entire array of detailed paragraphs
						this.state.details = detailsArray;
						// Render the updated title to DOM
						this.renderPhilosophers();
						// Render updated details to DOM
						this.renderDetails();
					}
				}
    		}.bind(this));
    	}.bind(this));
    },

    

    renderPhilosophers: function() {
        // Loop through the exploreObject philosophers object
        return this.state.philosophers.map(function(name, index){
            // Dynamically creates links to Wikipedia page of philosopher
            var thisAnchor = "https://en.wikipedia.org/wiki/" + name;
            // Removes spaces from url if the Philosopher is referred to as both first and last name
            thisAnchor.replace(/\s/g, '');
      // Render anchor tag for each philosopher inside of map function
      return (
        <ul>
            <div key={index}>
                <li>
                    <a href = {thisAnchor} > {name} </a>
                </li>
            </div>
        </ul>
      )
        })
    },

    renderDetails: function(){
        // Loop through each property/value in details object
        return this.state.details.map( function(details, index){
            console.log("index: " + index +  ", details: " + details);
            // Will be used to create a unique identifier for each details paragraph
            var thisKey = "details-" + index;
            // Render details, with each paragraph inside it's own p tag
            return (
                <div class = "details" id = {thisKey}>
                    <p>{ details } </p>
                </div>
            )
        });
    },

    handleClick: function() {

    },

    render: function() {
        return(
        <div className = "row">
          <div className = "col-md-2">
          </div>

          <div className = "col-md-8" id = "content-container">
            <div className = "explore-title">
              <h1 className = "title">{this.state.title}</h1>
              <h4> {this.state.summary} </h4>
              <h4 id = "prominent-philosopher-title">Prominent Philosophers: </h4>
              {this.renderPhilosophers()}
              {this.renderDetails() }
              {this.findMatchingTitle()}
            </div>
          
          </div>

        <div className = "col-md-2">
        </div>
        </div>
      )
   }


});

module.exports = ExploreContent;