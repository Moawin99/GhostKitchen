import React, { Component } from 'react';

const GlobalContext = React.createContext(null);

class GlobalProvider extends Component {
	state = {
		isLoggedIn: false,
		currentUser: [],
		roleId: '',
		menu: []
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

	setMenu = (e) => {
		this.setState({ menu: e });
	};

	render() {
		const { children } = this.props;
		const { isLoggedIn } = this.state;
		const { currentUser } = this.state;
		const { roleId } = this.state;
		const { menu } = this.state;
		const { setisLoggedIn } = this;
		const { setcurrentUser } = this;
		const { setroleId } = this;
		const { setMenu } = this;
		return (
			<GlobalContext.Provider
				value={{ isLoggedIn, setisLoggedIn, currentUser, setcurrentUser, roleId, setroleId, menu, setMenu }}
			>
				{children}
			</GlobalContext.Provider>
		);
	}
}

export default GlobalContext;
export { GlobalProvider };
