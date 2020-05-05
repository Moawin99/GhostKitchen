import React from 'react';
import '../styleSheets/aboutHeaderStyle.css';

const AboutHeader = () => {
	return (
		<div className="header-container">
			<h2 className="welcome-text">Welcome to Ghost Kitchen!</h2>
			<div className="description">
				With this service we provide you with all your favorite restaurants from the ease of your home computer!
				(not phone bc css is hard)
			</div>
		</div>
	);
};

export default AboutHeader;
