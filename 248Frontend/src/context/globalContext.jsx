import React, { Component } from 'react';
import Axios from 'axios';

const GlobalContext = React.createContext(null);

class GlobalProvider extends Component {
	state = {
		isLoggedIn: false,
		currentUser: [],
		role: ''
	};

	setisLoggedIn = (e) => {
		this.setState({ isLoggedIn: e });
	};

	setcurrentUser = (e) => {
		this.setState({ currentUser: e });
	};

	setrole = (e) => {
		this.setState({ role: e });
	};

	render() {
		const { children } = this.props;
		const { isLoggedIn } = this.state;
		const { currentUser } = this.state;
		const { role } = this.state;
		const { setisLoggedIn } = this;
		const { setcurrentUser } = this;
		const { setrole } = this;
		return (
			<GlobalContext.Provider value={{ isLoggedIn, setisLoggedIn, currentUser, setcurrentUser, role, setrole }}>
				{children}
			</GlobalContext.Provider>
		);
	}
}

export default GlobalContext;
export { GlobalProvider };
