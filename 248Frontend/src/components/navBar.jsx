import React, { Component } from 'react';
import '../styleSheets/navBarStyle.css';
import logo from '../pictures/ghostKitchenLogo.png';
import { Link } from 'react-router-dom';
import DropDownMenu from './dropDownMenu';
import GlobalContext from '../context/globalContext';

class NavBar extends Component {
	static contextType = GlobalContext;
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
						<DropDownMenu />
					</div>
				</nav>
			</div>
		);
	}
}

export default NavBar;
