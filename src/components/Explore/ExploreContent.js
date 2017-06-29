import $ from "jquery";
var React = require("react");
var philData = require('./exploreData.json');




// $.getJSON("./exploreData.json", function(json) {
//     console.log(json); // this will show the info it in firebug console
// });

// var json = (function() {
//         var json = null;
//         $.ajax({
//             'async': false,
//             'global': false,
//             'url': "exploreData.json",
//             'dataType': "json",
//             'success': function (data) {
//                 json = data;
//             }
//         });
//         return json;
//     })();

$(function () {
	$.getJSON("exploreData.json", function (data) {
		console.log('success');
		// $.each(data.employees,function(i,emp){
		//     $('ul').append('<li>'+emp.firstName+' '+emp.lastName+'</li>');
		// });
		console.log(data.data);
		// }).error(function(){
		//     console.log('error');
	});
});

// console.log("json: " + json);

var ExploreContent = React.createClass({

	getInitialState: function () {
		return {
			title: "",
			summary: "",
			philosophers: [],
			details: [],
		}
	},

	renderTitle: function () {
		var thisTitle = this.title;
	},

	handleClick: function () {

	},


	render: function () {
		<div className="row">
			<div className="col-md-2">
			</div>

			<div className="col-md-8">
				<div className="explore-title">
					{this.renderTitle()}
				</div>

			</div>

			<div className="col-md-2">
			</div>
		</div>
	}
});

// module.exports = ExploreContent;