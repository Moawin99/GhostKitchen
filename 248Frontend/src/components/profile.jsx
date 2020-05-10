import React, { Component } from 'react';
import axios from 'axios';
import GlobalContext from '../context/globalContext';
import '../styleSheets/profile.css';

class Profile extends Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			userName: '',
			password: '',
			email: '',
			streetName: '',
			city: '',
			state: '',
			zip: '',
			isIdOne: false
		};
		this.logout = this.logout.bind(this);
		this.handleState = this.handleState.bind(this);
	}

	componentDidMount() {
		this.handleState();
	}

	logout() {
		const { setisLoggedIn, setcurrentUser, setroleId } = this.context;
		axios
			.post('/logout')
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				setisLoggedIn(false);
				setcurrentUser([]);
				setroleId('');
			});
	}

	handleState() {
		const { roleId } = this.context;
		if (roleId === 1) {
			this.setState({ isIdOne: true });
		}
	}

	render() {
		const { currentUser, isLoggedIn } = this.context;
		return isLoggedIn ? this.state.isIdOne ? (
			<div className="whole-container">
				<div className="info-container">
					<h2>
						Name: {currentUser.firstName} {currentUser.lastName}
					</h2>
					<h2>Email: {currentUser.email}</h2>
					<h2>Address: {currentUser.streetName}</h2>
					<h2>
						{currentUser.city}, {currentUser.state} {currentUser.zip}
					</h2>
					<h2>User Status: Customer</h2>
					<button className="logoutBtn" onClick={this.logout}>
						Logout
					</button>
				</div>
				<div className="update-container">
					<h2 className="update-text">Update Info</h2>
					<div className="register-container">
						<label>First Name</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ firstName: e.target.value });
							}}
						/>
						<label>Last Name</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ lastName: e.target.value });
							}}
						/>
						<label>Email</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ email: e.target.value });
							}}
						/>
						<label>Username</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ userName: e.target.value });
							}}
						/>
						<label>Password</label>
						<input
							className="input-text"
							type="password"
							onChange={(e) => {
								this.setState({ password: e.target.value });
							}}
						/>
						<label>Street Name</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ streetName: e.target.value });
							}}
						/>
						<label>City</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ city: e.target.value });
							}}
						/>
						<label>State</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ state: e.target.value });
							}}
						/>
						<label>Zip</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ zip: e.target.value });
							}}
						/>
						<button
							id="submitBtn"
							onClick={() => {
								const { setcurrentUser } = this.context;
								axios
									.put('/user/update', {
										firstName: this.state.firstName,
										lastName: this.state.lastName,
										userName: this.state.userName,
										password: this.state.password,
										email: this.state.email,
										streetName: this.state.streetName,
										city: this.state.city,
										state: this.state.state,
										zip: this.state.zip
									})
									.then(() => {
										axios
											.get('/currentUser')
											.then((response) => {
												setcurrentUser(response.data);
											})
											.catch((error) => {
												console.log(error);
											});
									})
									.catch((error) => {
										console.log(error);
									});
							}}
						>
							Submit Changes
						</button>
					</div>
				</div>
			</div>
		) : (
			<div className="whole-container">
				<div className="info-container">
					<h2>
						Name: {currentUser.firstName} {currentUser.lastName}
					</h2>
					<h2>Email: {currentUser.email}</h2>
					<h2>Address: {currentUser.streetName}</h2>
					<h2>
						{currentUser.city}, {currentUser.state} {currentUser.zip}
					</h2>
					<h2>User Status: Owner</h2>
					<button className="logoutBtn" onClick={this.logout}>
						Logout
					</button>
				</div>
				<div className="update-container">
					<h2 className="update-text">Update Info</h2>
					<div className="register-container">
						<label>First Name</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ firstName: e.target.value });
							}}
						/>
						<label>Last Name</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ lastName: e.target.value });
							}}
						/>
						<label>Email</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ email: e.target.value });
							}}
						/>
						<label>Username</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ userName: e.target.value });
							}}
						/>
						<label>Password</label>
						<input
							className="input-text"
							type="password"
							onChange={(e) => {
								this.setState({ password: e.target.value });
							}}
						/>
						<label>Street Name</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ streetName: e.target.value });
							}}
						/>
						<label>City</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ city: e.target.value });
							}}
						/>
						<label>State</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ state: e.target.value });
							}}
						/>
						<label>Zip</label>
						<input
							className="input-text"
							type="text"
							onChange={(e) => {
								this.setState({ zip: e.target.value });
							}}
						/>
						<button
							id="submitBtn"
							onClick={() => {
								const { setcurrentUser } = this.context;
								axios
									.put('/user/update', {
										firstName: this.state.firstName,
										lastName: this.state.lastName,
										userName: this.state.userName,
										password: this.state.password,
										email: this.state.email,
										streetName: this.state.streetName,
										city: this.state.city,
										state: this.state.state,
										zip: this.state.zip
									})
									.then(() => {
										axios
											.get('/currentUser')
											.then((response) => {
												setcurrentUser(response.data);
											})
											.catch((error) => {
												console.log(error);
											});
									})
									.catch((error) => {
										console.log(error);
									});
							}}
						>
							Submit Changes
						</button>
					</div>
				</div>
			</div>
		) : (
			<div>
				<h2>Please Log in to display Info</h2>
			</div>
		);
	}
}

export default Profile;
