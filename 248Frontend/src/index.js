import React from 'react';
import ReactDOM from 'react-dom';
import CreateLogin from '../src/components/login.jsx';
import NavBar from '../src/components/navBar';
import Register from '../src/components/register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from '../src/components/homepage';

ReactDOM.render(
	<Router>
		<div>
			<NavBar />
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={CreateLogin} />
			</Switch>
		</div>
	</Router>,
	document.getElementById('root')
);
