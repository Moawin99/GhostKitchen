import React, { Component } from 'react';
import GlobalContext from '../context/globalContext';
import Axios from 'axios';
import RestaurantCard from './restaurantCard';
import AboutHeader from './aboutDiv';
import '../styleSheets/homePageStyle.css';

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
					<h2 className="selection-text">Available Restaurants</h2>
				</div>
				<div className="restaurantCard-container">
					{this.state.restaurants.map((restaurant) => (
						<RestaurantCard
							key={restaurant.id}
							name={restaurant.name}
							streetName={restaurant.streetName}
							city={restaurant.city}
							state={restaurant.state}
							zip={restaurant.zip}
							id={restaurant.id}
						/>
					))}
				</div>
			</div>
		) : (
			<AboutHeader />
		);
	}
}

export default Homepage;
