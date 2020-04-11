import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			person: []
		};
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

	render() {
		return (
			<div id="user-data-wrapper">
				<h2>Welcome {this.state.person.firstName}</h2>
			</div>
		);
	}
}

export default Homepage;
