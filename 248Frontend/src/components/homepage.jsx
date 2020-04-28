import React, { Component } from 'react';
import GlobalContext from '../context/globalContext';
import MenuItemCard from './menuItemCard';
import Axios from 'axios';

class Homepage extends Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {
			items: []
		};
	}

	componentDidMount() {
		Axios.get('/items')
			.then((response) => {
				this.setState({ items: response.data });
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return this.context.isLoggedIn ? (
			<div>
				<h1>Welcome {this.context.currentUser.firstName}</h1>
				{this.state.items.map((item) => (
					<MenuItemCard
						key={item.id}
						name={item.name}
						price={item.price}
						description={item.description}
						id={item.id}
					/>
				))}
			</div>
		) : (
			<div>
				<h1>Welcome Guest</h1>
			</div>
		);
	}
}

export default Homepage;
