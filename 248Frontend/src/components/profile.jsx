import React, { Component } from 'react';
import axios from 'axios';
import GlobalContext from '../context/globalContext';
import CartItemCard from './cartItemCard';

class Profile extends Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {
			cart: [],
			hasData: false
		};
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		axios
			.get('/cart')
			.then((response) => {
				this.setState({ cart: response.data });
				this.setState({ hasData: true });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	logout() {
		const { setisLoggedIn, setcurrentUser, setMenu, setroleId } = this.context;
		axios
			.post('/logout')
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				setisLoggedIn(false);
				setcurrentUser([]);
				setMenu([]);
				setroleId('');
				this.setState({ cart: [] });
				this.setState({ hasData: false });
			});
	}

	render() {
		return this.state.hasData ? (
			<div id="info-wrapper">
				<h1>Welcome {this.context.currentUser.firstName} </h1>
				<button onClick={this.logout}>Logout</button>
				{this.state.cart.map((cartItem) => (
					<CartItemCard
						key={cartItem.id}
						name={cartItem.name}
						description={cartItem.description}
						price={cartItem.price}
						amount={cartItem.amount}
						id={cartItem.id}
					/>
				))}
			</div>
		) : (
			<div id="info-wrapper">
				<h1>Welcome {this.context.currentUser.firstName} </h1>
				<button onClick={this.logout}>Logout</button>
			</div>
		);
	}
}

export default Profile;
