import React, { Component } from 'react';
import Axios from 'axios';
import '../styleSheets/menuItemPageStyle.css';

class MenuItemPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			price: ''
		};
		this.createItem = this.createItem.bind(this);
	}

	createItem() {
		Axios.put('/owner/restaurant/menuItems', {
			name: this.state.name,
			description: this.state.description,
			price: this.state.price
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="name-fields">
				<label>Item Name</label>
				<input
					onChange={(e) => {
						this.setState({ name: e.target.value });
					}}
					className="inputfields"
				/>
				<label>Item Description</label>
				<input
					onChange={(e) => {
						this.setState({ description: e.target.value });
					}}
					className="inputfields"
				/>
				<label>Price</label>
				<input
					onChange={(e) => {
						this.setState({ price: e.target.value });
					}}
					className="inputfields"
				/>
				<button className="create-button" onClick={this.createItem}>
					Create
				</button>
			</div>
		);
	}
}

export default MenuItemPage;
