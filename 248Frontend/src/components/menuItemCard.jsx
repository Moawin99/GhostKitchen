import React, { Component } from 'react';
import Axios from 'axios';

class MenuItemCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			description: props.description,
			price: props.price
		};
	}

	render() {
		return (
			<div className="card-container">
				<h2>{this.props.name}</h2>
				<div>{this.props.price}</div>
				<div>{this.props.description}</div>
				<button
					onClick={() => {
						Axios.put(`/cart/add/${this.props.id}`, {
							name: this.state.name,
							description: this.state.description,
							price: this.state.price
						})
							.then((response) => {
								console.log(response);
							})
							.catch((error) => {
								console.log(error);
							});
					}}
				>
					Add To Cart
				</button>
			</div>
		);
	}
}

export default MenuItemCard;
