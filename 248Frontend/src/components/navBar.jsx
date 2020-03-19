import React, { Component } from 'react';
import '../styleSheets/navBarStyle.css';
import logo from '../pictures/ghostKitchenLogo.png';

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
				</nav>
			</div>
		);
	}
}

export default NavBar;
