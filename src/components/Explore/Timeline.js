var React = require('react');


var style = require("./style.css");
var CircularJSON = require('circular-json');

const backgroundImg1 = {
    backgroundImage: "url(http://dariusforoux.com/wp-content/uploads/2016/01/Greek_philosopher_busts.jpg)",
};
const backgroundImg2 = {
    backgroundImage: "url(https://coachfederation.org/blog/wp-content/uploads/2013/11/socrates.jpg)",
};
const backgroundImg3 = {
    backgroundImage: "url(https://historyofphilosophy.net/sites/historyofphilosophy.net/files/images/four-elements.jpg)",
};
const backgroundImg4 = {
    backgroundImage: "url(http://www.crisismagazine.com/wp-content/uploads/2011/05/philosophy.jpg)"
}
const backgroundImg5 = {
    backgroundImage: "url(https://www.tcd.ie/Philosophy/assets/images/homepage/philosophy-slider-library.gif)"
}
const backgroundImg6 = {
    backgroundImage: "url(http://2.bp.blogspot.com/-uaeqsBrmrB4/UsL4ghqxDJI/AAAAAAAABMA/CqgHTWR3S3U/s400/Vitruviano.jpg)"
}
const backgroundImg7 = {
    backgroundImage: "url(https://s-media-cache-ak0.pinimg.com/originals/d2/dd/ed/d2dded13719196d330305944509a7ca4.jpg)"
}
const backgroundImg8 = {
    backgroundImage: "url(https://qph.ec.quoracdn.net/main-qimg-9fb75a1ad8d7b696e7ecc8104aa29c06)"
}
const backgroundImg9 = {
    backgroundImage: "url(https://s-media-cache-ak0.pinimg.com/originals/22/e9/a6/22e9a6934aebe444986f3e54f300e6ce.gif)"
}

var Timeline = React.createClass({

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
              <p className="f2 heading--sanSerif" value = "Medieval">980 - 1350 AD</p>
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
              <p className="f2 heading--sanSerif" value = "Renaissance">1400 - 1630 BC</p>
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
              <p className="f2 heading--sanSerif" value = "Age of Reason">1600 - 1715 AD</p>
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
              <p className="f2 heading--sanSerif" value = "Age of Enlightenment">1685 - 1800 AD</p>
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
              <p className="f2 heading--sanSerif" value = "Modern">1800 - 1910 AD</p>
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
});

module.exports = Timeline;