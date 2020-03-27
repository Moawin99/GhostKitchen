import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			person: []
		};
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		axios
			.get('/currentUser')
			.then((response) => {
				this.setState({ person: response.data });
				console.log(this.state.person);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	logout() {
		axios
			.put('/logout')
			.then((response) => {
				this.setState({ person: response.data });
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div id="info-wrapper">
				<h1>Welcome {this.state.person.firstName} </h1>
				<button onClick={this.logout}>Logout</button>
			</div>
		);
	}
}

export default Profile;
