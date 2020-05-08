import React, { Component } from 'react';
import Axios from 'axios';
import '../styleSheets/menuItemCardStyle.css';

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
				<div className="card">
					<h2 className="item-name">{this.props.name}</h2>
					<p className="text">{this.props.description}</p>
					<p className="text">{this.props.price}</p>
					<button
						className="add-button"
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
			</div>
		);
	}
}

export default MenuItemCard;
