import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styleSheets/dropdownStyle.css';

class DropDown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayMenu: false,
			isLoggedIn: false
		};
		this.showDropDownMenu = this.showDropDownMenu.bind(this);
		this.hideDropDownMenu = this.hideDropDownMenu.bind(this);
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
				{this.state.displayMenu ? (
					<ul className="settings-list">
						<li className="list-element">
							<Link to="/login" className="link">
								Login
							</Link>
						</li>
						<li className="list-element">
							<Link to="/profile" className="link">
								Profile
							</Link>
						</li>
					</ul>
				) : null}
			</div>
		);
	}
}

export default DropDown;
