import React, { Component } from 'react';
import axios from 'axios';
import '../styleSheets/loginStyle.css';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/globalContext';

class CreateLogin extends Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: ''
		};

		this.getUser = this.getUser.bind(this);
	}

	getUser() {
		const { setisLoggedIn, setcurrentUser, setroleId, setMenu } = this.context;
		axios
			.post('/user/login', {
				userName: this.state.userName,
				password: this.state.password
			})
			.then(function(response) {
				setisLoggedIn(true);
				console.log(response);
				axios
					.get('/currentUser')
					.then((response) => {
						setcurrentUser(response.data);
						setroleId(response.data.roles[0].id);
						if (response.data.roles[0].id === 2) {
							setMenu(response.data.restaurant.menu);
						}
						console.log(response.data);
					})
					.catch((error) => {
						console.log(error);
					});
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
				<Link to="/">
					<button id="login-button" onClick={this.getUser}>
						Login
					</button>
				</Link>
				<Link to="/register">
					<p id="register-link">Create an account</p>
				</Link>
			</div>
		);
	}
}

export default CreateLogin;
