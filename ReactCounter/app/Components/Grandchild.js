// Include React 
var React = require('react');

// Create the GrandChild Component
var GrandChild = React.createClass({

	getInitialState: function() {
		return {
			number: 0
		}
	},

	render: function(){


		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">GrandChild</h3>
				</div>
				<div className="panel-body text-center">

					{/* Grandchild will use it's own parents number ("child") with its own state.*/}
					<h4>Hey I'm a Grandchild!</h4>

					<h4>{this.state.number + 4 * this.props.number}</h4>
				</div>
			</div>
		)
	}
});

// Export the componen back for use in other files
module.exports = GrandChild;