import React, { Component } from 'react';
import axios from 'axios';
import '../styleSheets/register.css';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			userName: '',
			password: '',
			streetName: '',
			city: '',
			state: '',
			zip: ''
		};

		this.createUser = this.createUser.bind(this);
	}

	createUser() {
		axios
			.post('/user', {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				userName: this.state.userName,
				password: this.state.password,
				streetName: this.state.streetName,
				city: this.state.city,
				state: this.state.state,
				zip: this.state.zip
			})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	render() {
		return (
			<div className="register-wrapper">
				<label>First Name:</label>
				<input
					onChange={(e) => {
						this.setState({ firstName: e.target.value });
					}}
					className="inputfield"
				/>
				<label>Last Name:</label>
				<input
					onChange={(e) => {
						this.setState({ lastName: e.target.value });
					}}
					className="inputfield"
				/>
				<label>Username:</label>
				<input
					onChange={(e) => {
						this.setState({ userName: e.target.value });
					}}
					className="inputfield"
				/>
				<label>Password:</label>
				<input
					onChange={(e) => {
						this.setState({ password: e.target.value });
					}}
					className="inputfield"
				/>
				<label>Street:</label>
				<input
					onChange={(e) => {
						this.setState({ streetName: e.target.value });
					}}
					className="inputfield"
				/>
				<label>City:</label>
				<input
					onChange={(e) => {
						this.setState({ city: e.target.value });
					}}
					className="inputfield"
				/>
				<label>State:</label>
				<input
					onChange={(e) => {
						this.setState({ state: e.target.value });
					}}
					className="inputfield"
				/>
				<label>Zip:</label>
				<input
					onChange={(e) => {
						this.setState({ zip: e.target.value });
					}}
					className="inputfield"
				/>
				<div id="button-wrapper">
					<button onClick={this.createUser}>Register</button>
				</div>
			</div>
		);
	}
}

export default Register;
