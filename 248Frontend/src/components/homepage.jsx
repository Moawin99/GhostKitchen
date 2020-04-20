import React, { Component } from 'react';
import GlobalContext from '../context/globalContext';

class Homepage extends Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return this.context.isLoggedIn ? (
			<div>
				<h1>Welcome {this.context.currentUser.firstName}</h1>
			</div>
		) : (
			<div>
				<h1>Welcome Guest</h1>
			</div>
		);
	}
}

export default Homepage;
