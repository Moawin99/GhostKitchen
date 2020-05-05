import React, { Component } from 'react';
import GlobalContext from '../context/globalContext';
import Axios from 'axios';
import RestaurantCard from './restaurantCard';
import AboutHeader from './aboutDiv';

class Homepage extends Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {
			restaurants: []
		};
	}

	componentDidMount() {
		Axios.get('/selection')
			.then((response) => {
				this.setState({ restaurants: response.data });
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return this.context.isLoggedIn ? (
			<div>
				<AboutHeader />
				<div className="selection-container">
					<h2>Available Restaurants</h2>
					<div className="restaurantCard-container">
						{this.state.restaurants.map((restaurant) => (
							<RestaurantCard
								key={restaurant.id}
								name={restaurant.name}
								streetName={restaurant.streetName}
								city={restaurant.city}
								id={restaurant.id}
							/>
						))}
					</div>
				</div>
			</div>
		) : (
			<AboutHeader />
		);
	}
}

export default Homepage;
