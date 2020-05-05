import React, { Component } from 'react';
import Axios from 'axios';
import MenuItemCard from './menuItemCard';
import GlobalContext from '../context/globalContext';

class RestaurantPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurant: {},
			menu: []
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		Axios.get(`/restaurant/${id}`)
			.then((response) => {
				this.setState({ restaurant: response.data });
				this.setState({ menu: response.data.menu });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div>
				<h2>{this.state.restaurant.name}</h2>
				<div>{this.state.restaurant.streetName}</div>
				<div>{this.state.restaurant.city}</div>
				<div>{this.state.restaurant.state}</div>
				<div>{this.state.restaurant.zip}</div>
				{this.state.menu.map((item) => (
					<MenuItemCard key={item.id} name={item.name} price={item.price} description={item.description} />
				))}
			</div>
		);
	}
}

export default RestaurantPage;
