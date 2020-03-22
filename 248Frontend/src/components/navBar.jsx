import React, { Component } from 'react';
import '../styleSheets/navBarStyle.css';
import logo from '../pictures/ghostKitchenLogo.png';
import { Link } from 'react-router-dom';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="nav-div">
				<nav className="nav-bar">
					<div className="logo-brand-container">
						<img src={logo} alt="logo" className="logo-picture" />
						<h1 className="header">Ghost Kitchen</h1>
					</div>
					<div id="signIn-link">
						<Link to="/login">
							<p id="signIn-text">Sign In</p>
						</Link>
					</div>
				</nav>
			</div>
		);
	}
}

export default NavBar;
