import React from 'react';
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
	}

	createRestaurant() {
		axios.put('/owner/restaurant', {});
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

				<button id="register-button">Register</button>
			</div>
		);
	}
}

export default RestaurantRegister;
