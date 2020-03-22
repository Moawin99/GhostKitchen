import React, { Component } from 'react';
import axios from 'axios';
import '../styleSheets/loginStyle.css';
import { Link } from 'react-router-dom';

class CreateLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: ''
		};

		this.getUser = this.getUser.bind(this);
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
					className="inputfields"
				/>
				<label>Password:</label>
				<input
					type="password"
					onChange={(e) => {
						this.setState({ password: e.target.value });
					}}
					className="inputfields"
				/>

				<button id="login-button" onClick={this.getUser}>
					Login
				</button>
				<Link to="/register">
					<p id="register-link">Create an account</p>
				</Link>
			</div>
		);
	}
}

export default CreateLogin;
