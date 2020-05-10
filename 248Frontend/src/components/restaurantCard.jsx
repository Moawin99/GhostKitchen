import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styleSheets/restaurantCardStyle.css';

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
					<div className="card">
						<h2>{this.props.name}</h2>
						<p>{this.props.streetName}</p>
						<p>
							{this.props.city}, {this.props.state} {this.props.zip}
						</p>
					</div>
				</div>
			</Link>
		);
	}
}

export default RestaurantCard;
