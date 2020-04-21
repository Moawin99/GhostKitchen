import React, { Component } from 'react';
import Axios from 'axios';

const GlobalContext = React.createContext(null);

class GlobalProvider extends Component {
	state = {
		isLoggedIn: false,
		currentUser: [],
		roleId: ''
	};

	setisLoggedIn = (e) => {
		this.setState({ isLoggedIn: e });
	};

	setcurrentUser = (e) => {
		this.setState({ currentUser: e });
	};

	setroleId = (e) => {
		this.setState({ roleId: e });
	};

	render() {
		const { children } = this.props;
		const { isLoggedIn } = this.state;
		const { currentUser } = this.state;
		const { roleId } = this.state;
		const { setisLoggedIn } = this;
		const { setcurrentUser } = this;
		const { setroleId } = this;
		return (
			<GlobalContext.Provider
				value={{ isLoggedIn, setisLoggedIn, currentUser, setcurrentUser, roleId, setroleId }}
			>
				{children}
			</GlobalContext.Provider>
		);
	}
}

export default GlobalContext;
export { GlobalProvider };
