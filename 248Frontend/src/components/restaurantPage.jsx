import React, { Component } from 'react';
import Axios from 'axios';
import MenuItemCard from './menuItemCard';
import '../styleSheets/restaurantPageStyle.css';

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
				<div className="info-container">
					<h2 className="name">{this.state.restaurant.name}</h2>
					<p className="address">{this.state.restaurant.streetName}</p>
					<p className="address">{this.state.restaurant.city}</p>
					<p className="address">{this.state.restaurant.state}</p>
					<p className="address">{this.state.restaurant.zip}</p>
				</div>
				<div className="menu-text">
					<p className="menu">Menu</p>
				</div>
				<div className="menuItemCard-container">
					{this.state.menu.map((item) => (
						<MenuItemCard
							key={item.id}
							name={item.name}
							price={item.price}
							description={item.description}
							id={item.id}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default RestaurantPage;
