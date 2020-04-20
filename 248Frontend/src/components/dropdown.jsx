import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styleSheets/dropdownStyle.css';
import Axios from 'axios';

class DropDown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			person: [],
			displayMenu: false,
			isLoggedIn: false
		};
		this.showDropDownMenu = this.showDropDownMenu.bind(this);
		this.hideDropDownMenu = this.hideDropDownMenu.bind(this);
	}

	componentDidMount() {
		Axios.get('/currentUser')
			.then((response) => {
				this.setState({ person: response.data });
				this.setState({ isLoggedIn: true });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	showDropDownMenu(e) {
		e.preventDefault();
		this.setState({ displayMenu: true }, () => {
			document.addEventListener('click', this.hideDropDownMenu);
		});
	}

	hideDropDownMenu() {
		this.setState({ displayMenu: false }, () => {
			document.removeEventListener('click', this.hideDropDownMenu);
		});
	}

	render() {
		return (
			<div className="dropdown" style={{ width: '200px' }}>
				<div className="button" onClick={this.showDropDownMenu}>
					My Settings
				</div>
				{this.state.displayMenu ? this.state.isLoggedIn ? (
					<ul className="list-container">
						<li>
							<Link to="/profile">Profile</Link>
						</li>
					</ul>
				) : (
					<ul className="list-container">
						<li>
							<Link to="/Login">Login</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</ul>
				) : null}
			</div>
		);
	}
}

export default DropDown;
