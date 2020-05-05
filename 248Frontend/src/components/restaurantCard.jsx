import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RestaurantCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Link
				to={{
					pathname: `/restaurant/${this.props.id}`
				}}
			>
				<div className="card-container">
					<h2>{this.props.name}</h2>
					<div>{this.props.streetName}</div>
					<div>{this.props.city}</div>
				</div>
			</Link>
		);
	}
}

export default RestaurantCard;
