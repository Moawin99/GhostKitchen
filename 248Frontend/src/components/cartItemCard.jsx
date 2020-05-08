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
				<h2>{this.state.name}</h2>
				<div>{this.state.description}</div>
				<div>{this.state.price}</div>
				<div>Amount: {this.state.amount}</div>
				<button
					onClick={() => {
						Axios.put(`/cart/remove/${this.props.id}`)
							.then((response) => {
								console.log(response);
								this.setState({ amount: this.state.amount - 1 });
								this.props.updateCart();
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
