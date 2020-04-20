import React, { Component } from 'react';
import axios from 'axios';
import GlobalContext from '../context/globalContext';

class Profile extends Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {};
		this.logout = this.logout.bind(this);
	}

	logout() {
		const { setisLoggedIn, setcurrentUser } = this.context;
		axios
			.post('/logout')
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				setisLoggedIn(false);
				setcurrentUser([]);
			});
	}

	render() {
		return (
			<div id="info-wrapper">
				<h1>Welcome {this.context.currentUser.firstName} </h1>
				<button onClick={this.logout}>Logout</button>
			</div>
		);
	}
}

export default Profile;
