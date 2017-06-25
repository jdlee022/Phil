import React, {Component} from 'react'

import oedipus from '../img/Oedipus.jpg'
import sphinx from '../img/Sphinx.jpg'

export default class Play extends Component {
	render() {
		return (
			<div className="row container-fluid">
				{/**<div className="row progress-bar">
					<div className="progress">
						<div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
							aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
							70% Complete (danger)
  						</div>
						<div className="progress">
							<div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
								aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
								70% Complete (danger)
  						</div>
						</div>
					</div>
				</div>*/}

				<div className="row">
					<p className="col-lg-6 questionBox">
						"Quote from someone"
					</p>
				</div>

				<div className="row">
					<img className="col-lg-4" src={sphinx} alt="Sphinx"/>
					<form action="" className="col-lg-4">
						<br /> <br /> <br />  <br /> <br /> <br />
						<label htmlFor="">Who said this?</label><br />
						Answer: <input type="text" />
					</form>
					<img className="col-lg-4" src={oedipus} alt="Oedipus" />
				</div>
					
			</div>
		)
	}
}