import React, { Component } from 'react';
import Axios from 'axios';

class CartItemCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			description: props.description,
			price: props.price,
			amount: props.amount
		};
	}
	render() {
		return (
			<div>
				<h2>{this.props.name}</h2>
				<div>{this.props.description}</div>
				<div>{this.props.price}</div>
				<div>Amount = {this.props.amount}</div>
				<button
					onClick={() => {
						Axios.put(`/cart/remove/${this.props.id}`)
							.then((response) => {
								console.log(response);
							})
							.catch((error) => {
								console.log(error);
							});
					}}
				>
					Remove from Cart
				</button>
			</div>
		);
	}
}

export default CartItemCard;
