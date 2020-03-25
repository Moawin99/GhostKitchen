import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			person: []
		};
	}

	componentDidMount() {
		axios
			.get('/user')
			.then((response) => {
				this.setState({ person: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div id="info-wrapper">
				<ul>{this.state.person.map((person) => <li>{person.firstName}</li>)}</ul>
				{/* <h2 className="info">FirstName</h2>
				<h2 className="info">LastName</h2>
				<h2 className="info">UserName</h2>
				<h2 className="info">Password</h2>
				<h2 className="info">Email</h2>
				<h2 className="info">StreetName</h2>
				<h2 className="info">City</h2>
				<h2 className="info">State</h2>
				<h2 className="info">Zip</h2> */}
			</div>
		);
	}
}

export default Profile;
