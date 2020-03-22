import React from 'react';
import ReactDOM from 'react-dom';
import CreateLogin from '../src/components/login.jsx';
import NavBar from '../src/components/navBar';
import Register from '../src/components/register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/homepage.jsx';

ReactDOM.render(
	<div>
		<Router>
			<NavBar />
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={CreateLogin} />
			</Switch>
		</Router>
	</div>,
	document.getElementById('root')
);
