import React, { Component } from 'react';
import '../styleSheets/navBarStyle.css';
import logo from '../pictures/ghostKitchenLogo.png';
import { Link } from 'react-router-dom';
import './dropdown';
import DropDown from './dropdown';

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
						<Link to="/">
							<img src={logo} alt="logo" className="logo-picture" />
						</Link>
						<h1 className="header">Ghost Kitchen</h1>
					</div>
					<div id="signIn-link">
						<DropDown />
					</div>
				</nav>
			</div>
		);
	}
}

export default NavBar;
