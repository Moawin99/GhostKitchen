import React, { Component } from 'react';
import axios from 'axios';
import '../styleSheets/loginStyle.css';

class CreateLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			userName: '',
			password: '',
			streetName: '',
			city: '',
			zip: ''
		};
		this.createUser = this.createUser.bind(this);
		this.getUser = this.getUser.bind(this);
	}

	createUser() {
		axios
			.post('/user', {
				firstName: this.state.firstName,
				lastName: this.state.lastName
			})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	getUser() {
		axios
			.post('/user/login', {
				userName: this.state.userName,
				password: this.state.password
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
			<div className="name-fields">
				<label>Username:</label>
				<input
					onChange={(e) => {
						this.setState({ userName: e.target.value });
					}}
					id="userName"
				/>
				<label>Password:</label>
				<input
					onChange={(e) => {
						this.setState({ password: e.target.value });
					}}
					id="password"
				/>

				<div className="button-wrapper">
					<button onClick={this.getUser} id="login">
						Login
					</button>
					<button id="search">Search</button>
					<button onClick={this.createUser} id="create">
						Create
					</button>
				</div>
			</div>
		);
	}
}

export default CreateLogin;
