import React from 'react';
import ReactDOM from 'react-dom';
import CreateLogin from '../src/components/login.jsx';
import NavBar from '../src/components/navBar';
import Register from '../src/components/register';

ReactDOM.render(
	<div>
		<NavBar />
		<Register />
	</div>,
	document.getElementById('root')
);
