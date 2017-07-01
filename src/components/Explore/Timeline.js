var React = require('react');


var style = require("./style.css");
var CircularJSON = require('circular-json');

const backgroundImg1 = {
    backgroundImage: "url(https://placeimg.com/801/801/nature)",
};
const backgroundImg2 = {
    backgroundImage: "url(https://placeimg.com/802/802/nature)",
};
const backgroundImg3 = {
    backgroundImage: "url(https://placeimg.com/803/803/nature)",
};
const backgroundImg4 = {
    backgroundImage: "url(https://placeimg.com/800/800/nature)"
}
const backgroundImg5 = {
    backgroundImage: "url(https://placeimg.com/804/804/nature)"
}
const backgroundImg6 = {
    backgroundImage: "url(https://placeimg.com/805/805/nature)"
}
const backgroundImg7 = {
    backgroundImage: "url(https://placeimg.com/806/806/nature)"
}
const backgroundImg8 = {
    backgroundImage: "url(https://placeimg.com/807/807/nature)"
}
const backgroundImg9 = {
    backgroundImage: "url(https://placeimg.com/808/808/nature)"
}

var Timeline = React.createClass({

<<<<<<< HEAD
	getInitialState: function () {
		return {
			title: ""
		}
	},




	render: function () {
		return (
			<div className="container">
				<div className="row">
					<h1>Content goes here...</h1>
				</div>

				<div className="row">
					<section id="timeline">
						<div className="tl-item">
							<button data-timePeriod="">
								<div className="tl-bg" style={backgroundImg1}></div>
								<div className="tl-year">
									<p className="f2 heading--sanSerif">460 - 625 BC</p>
								</div>
								<div className="tl-content">
									<h1>Pre-Socratic</h1>
								</div>
							</button>
						</div>

						<div className="tl-item">
							<button>
								<div className="tl-bg" style={backgroundImg2}></div>

								<div className="tl-year">
									<p className="f2 heading--sanSerif">322 - 646 BC</p>
								</div>

								<div className="tl-content">
									<h1 className="f3 text--accent ttu">Socratic</h1>
								</div>
							</button>
						</div>

						<div className="tl-item">
							<button>
								<div className="tl-bg" style={backgroundImg3}></div>

								<div className="tl-year">
									<p className="f2 heading--sanSerif">300 BC - 270 AD</p>
								</div>

								<div className="tl-content">
									<h1 className="f3 text--accent ttu">Hellenistic</h1>
								</div>
							</button>
						</div>

						<div className="tl-item">
							<button>
								<div className="tl-bg" style={backgroundImg4}></div>

								<div className="tl-year">
									<p className="f2 heading--sanSerif">300 - 525 AD</p>
								</div>

								<div className="tl-content">
									<h1 className="f3 text--accent ttu">Roman</h1>
								</div>
							</button>
						</div>

						<div className="tl-item">
							<button>
								<div className="tl-bg" style={backgroundImg5}></div>
								<div className="tl-year">
									<p className="f2 heading--sanSerif">460 - 625 BC</p>
								</div>
								<div className="tl-content">
									<h1>Medieval</h1>
								</div>
							</button>
						</div>

						<div className="tl-item">
							<button>
								<div className="tl-bg" style={backgroundImg6}></div>
								<div className="tl-year">
									<p className="f2 heading--sanSerif">460 - 625 BC</p>
								</div>
								<div className="tl-content">
									<h1>Renaissance</h1>
								</div>
							</button>
						</div>

						<div className="tl-item">
							<button>
								<div className="tl-bg" style={backgroundImg7}></div>
								<div className="tl-year">
									<p className="f2 heading--sanSerif">460 - 625 BC</p>
								</div>
								<div className="tl-content">
									<h1>Age of Reason</h1>
								</div>
							</button>
						</div>

						<div className="tl-item">
							<button>
								<div className="tl-bg" style={backgroundImg8}></div>
								<div className="tl-year">
									<p className="f2 heading--sanSerif">460 - 625 BC</p>
								</div>
								<div className="tl-content">
									<h1>Age of Enlightenment</h1>
								</div>
							</button>
						</div>

						<div className="tl-item">
							<button>
								<div className="tl-bg" style={backgroundImg9}></div>
								<div className="tl-year">
									<p className="f2 heading--sanSerif">460 - 625 BC</p>
								</div>
								<div className="tl-content">
									<h1>Modern</h1>
								</div>
							</button>
						</div>
					</section>
				</div>
			</div>
		)
	}
=======
    getInitialState: function() {
        return{
        title:""
        }
    },

    handleClick: function(event) {
        event.preventDefault();
        console.log("CLICKED");
        var thisEvent = event.target;
        // console.log("thisEvent: " + thisEvent);
        // console.log("value: " + CircularJSON.stringify(event.target));
        console.log(thisEvent.getAttribute("value"));

        var newTitle = thisEvent.getAttribute("value");
    
        this.props.updateTitle(newTitle);
    },
        


render: function() {
    return (
    <div className = "container">

      <div className = "row">
        <section id="timeline">
          <div className="tl-item" >
            <a href = "#" role = "button" value = "Pre-Socratic" onClick = {this.handleClick}>
              <div className="tl-bg" value = "Pre-Socratic" style={backgroundImg1}></div>
              <div className="tl-year" value = "Pre-Socratic">
                <p className="f2 heading--sanSerif" value = "Pre-Socratic">460 - 625 BC</p>
              </div>
             <div className="tl-content" value = "Pre-Socratic">
            <h1 className="f3 text--accent ttu" value = "Pre-Socratic">Pre-Socratic</h1>
            </div>
             </a>      
          </div>
         

        <div className="tl-item">
          <a href = "#" role = "button" value = "Socratic" onClick = {this.handleClick}>
          <div className="tl-bg" style={backgroundImg2}></div>
            <div className="tl-year" value = "Socratic">
              <p className="f2 heading--sanSerif" value = "Socratic">322 - 646 BC</p>
            </div>
            <div className="tl-content" value = "Socratic">
            <h1 className="f3 text--accent ttu" value = "Socratic">Socratic</h1>
            </div>
          </a>
        </div>

        <div className="tl-item">
          <a href = "#" role = "button" value = "Hellenistic" onClick = {this.handleClick}>
            <div className="tl-bg" value = "Hellenistic" style={backgroundImg3}></div>
            <div className="tl-year"value = "Hellenistic" >
              <p className="f2 heading--sanSerif" value = "Hellenistic" >300 BC - 270 AD</p>
            </div>
            <div className="tl-content"value = "Hellenistic" >
              <h1 className="f3 text--accent ttu"value = "Hellenistic" >Hellenistic</h1>
            </div>
          </a>
        </div>

        <div className="tl-item">
          <a href = "#" role = "button" value = "Roman" onClick = {this.handleClick}>
            <div className="tl-bg" style={backgroundImg4} value = "Roman"></div>
            <div className="tl-year" value = "Roman">
              <p className="f2 heading--sanSerif" value = "Roman">300 - 525 AD</p>
            </div>
            <div className="tl-content" value = "Roman">
              <h1 className="f3 text--accent ttu" value = "Roman">Roman</h1>
            </div>
          </a> 
        </div>

        <div className="tl-item">
          <a href = "#" role = "button" value = "Medieval" onClick = {this.handleClick}>
            <div className="tl-bg" style={backgroundImg5}></div>
              <div className="tl-year" value = "Medieval">
              <p className="f2 heading--sanSerif" value = "Medieval">460 - 625 BC</p>
              </div>
             <div className="tl-content" value = "Medieval">
               <h1 value = "Medieval">Medieval</h1>
            </div>
          </a>
        </div>

        <div className="tl-item">
          <a href = "#" role = "button" value = "Renaissance" onClick = {this.handleClick}>
            <div className="tl-bg" style={backgroundImg6}></div>
              <div className="tl-year" value = "Renaissance">
              <p className="f2 heading--sanSerif" value = "Renaissance">460 - 625 BC</p>
              </div>
             <div className="tl-content" value = "Renaissance">
               <h1 value = "Renaissance">Renaissance</h1>
            </div>
          </a>
        </div>
        
        <div className="tl-item">
          <a href = "#" role = "button" onClick = {this.handleClick}>
            <div className="tl-bg" style={backgroundImg7}></div>
              <div className="tl-year" value = "Age of Reason">
              <p className="f2 heading--sanSerif" value = "Age of Reason">460 - 625 BC</p>
              </div>
             <div className="tl-content" value = "Age of Reason">
               <h1 value = "Age of Reason">Age of Reason</h1>
            </div>
          </a>
        </div>
        
        <div className="tl-item">
          <a href = "#" role = "button" onClick = {this.handleClick}>
            <div className="tl-bg" style={backgroundImg8} value = "Age of Enlightenment"></div>
              <div className="tl-year" value = "Age of Enlightenment">
              <p className="f2 heading--sanSerif" value = "Age of Enlightenment">460 - 625 BC</p>
              </div>
             <div className="tl-content" value = "Age of Enlightenment">
               <h1 value = "Age of Enlightenment">Age of Enlightenment</h1>
            </div>
          </a>
        </div>

        <div className="tl-item">
          <a href = "/" role = "button" onClick = {this.handleClick}>
            <div className="tl-bg" style={backgroundImg9}></div>
              <div className="tl-year" value = "Modern">
              <p className="f2 heading--sanSerif" value = "Modern">460 - 625 BC</p>
              </div>
             <div className="tl-content" value = "Modern">
               <h1 value = "Modern">Modern</h1>
            </div>
          </a>
        </div>

      </section>
    </div>
  </div>
      )
    }
>>>>>>> 426c1000f4b0356df405033b107576e6586e5b54
});

module.exports = Timeline;