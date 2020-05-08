import React, { Component } from 'react';
import Axios from 'axios';
import CartItemCard from './cartItemCard';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: []
		};
		this.updateCart = this.updateCart.bind(this);
	}

	componentDidMount() {
		this.updateCart();
	}

	updateCart() {
		Axios.get('/cart')
			.then((response) => {
				console.log(response);
				this.setState({ cart: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="cart-container">
				{this.state.cart.map((cartItem) => (
					<CartItemCard
						name={cartItem.name}
						description={cartItem.description}
						price={cartItem.price}
						amount={cartItem.amount}
						key={cartItem.id}
						id={cartItem.id}
						updateCart={this.updateCart}
					/>
				))}
			</div>
		);
	}
}

export default Cart;
