import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";
import { Link } from "react-router-dom";

export default class InvoiceList extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = { fetching: false, data: [] };
	}

	componentWillUnmount() {
		console.log("Unmount Invoice List");
	}

	componentDidMount() {
		const o = this;
		console.log("Mount Invoice List");
		this.fetchAPI("/api/invoices/", "GET", null, (d) => {
			o.setState({ fetching: false, data: d });
		});
		o.setState({ fetching: true });
	}

	formatDate(value) {
		let date = new Date(value);
		return date.toDateString() + " " + date.toLocaleTimeString();
	}

	render() {
		console.log("Render Invoice List");
		const listdata = this.state.data;
		const listItems = listdata.map((d) => (
			<tr key={d.id} className="tableitem">
				<td>{d.id}</td>
				<td>{d.client}</td>
				<td>{this.formatDate(d.created_at)}</td>
				<td>{this.formatDate(d.updated_at)}</td>
				<td>{d.final ? d.total : "-"}</td>
				<td>{d.final ? "Final" : <Link to={"/invoices/edit/" + d.id}>Edit</Link>}</td>
				<td>
					<Link to={"/invoices/view/" + d.id}>View</Link>
				</td>
			</tr>
		));
		return (
			<div>
				<div className="tablediv">
					<table>
						<tr className="tablehead">
							<th>Id</th>
							<th>Client</th>
							<th>Created</th>
							<th>Updated</th>
							<th>Total</th>
							<th>Status</th>
							<th></th>
						</tr>
						{listItems}
					</table>
				</div>
				<br />
				<div>Fetching: {this.state.fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
