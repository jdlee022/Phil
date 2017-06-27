var React = require('react');


var style = require("./style.css");

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
							<button>
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
});

module.exports = Timeline;