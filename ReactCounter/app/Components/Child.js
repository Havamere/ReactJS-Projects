// Include React 
var React = require('react');

// Here we include all of the sub-components
var GrandChild = require('./GrandChild');

// Create the Child Component
var Child = React.createClass({

	getInitialState: function(){
		return {
			number: 0
		}
	},

	render: function(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">Child</h3>
				</div>
				<div className="panel-body text-center">

					{/* This is a child!*/}
					<h3>HEY I'm the Child!</h3>

					{/*this.setState({number: this.state.number + 2 * this.props.counter})*/}

					<h4>{this.state.number + 2 * this.props.counter}</h4>

					<GrandChild number = {this.state.number + 2 * this.props.counter}/>

				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Child;