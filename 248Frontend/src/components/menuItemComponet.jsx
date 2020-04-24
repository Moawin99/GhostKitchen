import React, { Component } from 'react';
import GlobalContext from '../context/globalContext';

class MenuItemComponet extends Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return <div className="menuitem-container" />;
	}
}

export default MenuItemComponet;
