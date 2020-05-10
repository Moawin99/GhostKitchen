import React, { Component } from 'react';
import Axios from 'axios';
import '../styleSheets/invoiceStyle.css';

class Invoice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderHistroy: []
		};
	}

	componentDidMount() {
		Axios.get('/cart/invoices')
			.then((response) => {
				console.log(response.data);
				this.setState({ orderHistroy: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="page-container">
				<div className="column-container">
					{this.state.orderHistroy.map((invoice) => (
						<div key={invoice.id} className="invoice-container">
							<h2>Invoice</h2>
							<p>Name: {invoice.name}</p>
							<p>Address: {invoice.streetName}</p>
							<p>{invoice.city}</p>
							<p>Total: ${invoice.total}</p>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Invoice;
