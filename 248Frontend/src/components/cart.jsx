import React, { Component } from 'react';
import Axios from 'axios';
import CartItemCard from './cartItemCard';
import '../styleSheets/cartStyle.css';
import GlobalContext from '../context/globalContext';

class Cart extends Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {
			cart: [],
			total: ''
		};
		this.updateCart = this.updateCart.bind(this);
		this.getTotal = this.getTotal.bind(this);
	}

	componentDidMount() {
		this.updateCart();
		this.getTotal();
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

	getTotal() {
		Axios.get('/cart/total')
			.then((response) => {
				this.setState({ total: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const { currentUser, setcurrentUser } = this.context;
		return (
			<div className="row">
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
				<div className="payment-container">
					<label>Name on Card</label>
					<input type="text" />
					<label>Card Number</label>
					<input type="text" maxLength="16" />
					<label>Experation Date</label>
					<input type="text" />
					<label>CVV</label>
					<input type="text" maxLength="3" />
					<label>Street Address</label>
					<input type="text" placeholder={currentUser.streetName} />
					<label>City</label>
					<input type="text" placeholder={currentUser.city} />
					<label>State</label>
					<input type="text" placeholder={currentUser.state} />
					<label>Zip</label>
					<input type="text" placeholder={currentUser.zip} maxLength="9" />
					<div className="total-row">
						<p>Total:</p>
						<p>${this.state.total}</p>
					</div>
					<button
						onClick={() => {
							Axios.put('/cart/checkout')
								.then((response) => {
									console.log(response.status);
								})
								.catch((error) => {
									console.log(error);
								});
							Axios.get('/currentUser')
								.then((response) => {
									setcurrentUser(response.data);
								})
								.catch((error) => {
									console.log(error);
								});
							alert('Order Placed');
						}}
					>
						Check Out
					</button>
				</div>
			</div>
		);
	}
}

export default Cart;
