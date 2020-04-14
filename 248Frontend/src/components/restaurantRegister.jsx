import React, { Component } from 'react';
import axios from 'axios';

class RestaurantRegister extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			streetName: '',
			city: '',
			state: '',
			zip: ''
		};
		this.createRestaurant = this.createRestaurant.bind(this);
	}

	createRestaurant() {
		axios
			.put('/owner/restaurant', {
				name: this.state.name,
				streetName: this.state.streetName,
				city: this.state.state,
				state: this.state.state,
				zip: this.state.zip
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="register-wrapper">
				<label className="register-text">Restaurant Name:</label>
				<input
					className="inputfield"
					onChange={(e) => {
						this.setState({ name: e.target.value });
					}}
				/>
				<label className="register-text">Street:</label>
				<input
					className="inputfield"
					onChange={(e) => {
						this.setState({ streetName: e.target.value });
					}}
				/>
				<label className="register-text">City:</label>
				<input
					className="inputfield"
					onChange={(e) => {
						this.setState({ city: e.target.value });
					}}
				/>
				<label className="register-text">State:</label>
				<input
					className="inputfield"
					onChange={(e) => {
						this.setState({ state: e.target.value });
					}}
				/>
				<label className="register-text">Zip:</label>
				<input
					className="inputfield"
					onChange={(e) => {
						this.setState({ zip: e.target.value });
					}}
				/>

				<button id="register-button" onClick={this.createRestaurant}>
					Register
				</button>
			</div>
		);
	}
}

export default RestaurantRegister;
