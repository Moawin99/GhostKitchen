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
				<label className="register-text">First Name:</label>
				<input
					onChange={(e) => {
						this.setState({ firstName: e.target.value });
					}}
					className="inputfield"
				/>
				<label className="register-text">Last Name:</label>
				<input
					onChange={(e) => {
						this.setState({ lastName: e.target.value });
					}}
					className="inputfield"
				/>
				<label className="register-text">Username:</label>
				<input
					onChange={(e) => {
						this.setState({ userName: e.target.value });
					}}
					className="inputfield"
				/>
				<label className="register-text">Password:</label>
				<input
					type="password"
					onChange={(e) => {
						this.setState({ password: e.target.value });
					}}
					className="inputfield"
				/>
				<label className="register-text">Street:</label>
				<input
					onChange={(e) => {
						this.setState({ streetName: e.target.value });
					}}
					className="inputfield"
				/>
				<label className="register-text">City:</label>
				<input
					onChange={(e) => {
						this.setState({ city: e.target.value });
					}}
					className="inputfield"
				/>
				<label className="register-text">State:</label>
				<input
					onChange={(e) => {
						this.setState({ state: e.target.value });
					}}
					className="inputfield"
				/>
				<label className="register-text">Zip:</label>
				<input
					onChange={(e) => {
						this.setState({ zip: e.target.value });
					}}
					className="inputfield"
				/>
				<div id="button-wrapper">
					<button id="register-button" onClick={this.createUser}>
						Register
					</button>
				</div>
			</div>
		);
	}
}

export default Register;
