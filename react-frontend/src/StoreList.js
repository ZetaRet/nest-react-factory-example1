import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";
import { Link } from "react-router-dom";

export default class StoreList extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = { fetching: false, data: [] };
	}

	componentWillUnmount() {
		console.log("Unmount Store List");
	}

	componentDidMount() {
		const o = this;
		console.log("Mount Store List");
		this.fetchAPI("/api/store/details", "GET", null, (d) => {
			o.setState({ fetching: false, data: d });
		});
		o.setState({ fetching: true });
	}

	render() {
		console.log("Render Store List");
		const listdata = this.state.data;
		const listItems = listdata.map((d) => (
			<tr key={d.id} className="tableitem">
				<td>{d.id}</td>
				<td>{d.parts_id}</td>
				<td>{d.vendor_id}</td>
				<td>
					<Link to={"/store/edit/" + d.id}>{d.name}</Link>
				</td>
				<td>{d.type}</td>
				<td>{d.model}</td>
				<td>{d.count}</td>
				<td>{d.price}</td>
			</tr>
		));
		return (
			<div>
				<div className="tablediv">
					<table>
						<tr className="tablehead">
							<th>StoreId</th>
							<th>PartId</th>
							<th>VendorId</th>
							<th>Part Name</th>
							<th>Part Type</th>
							<th>Part Model</th>
							<th>Count</th>
							<th>Price</th>
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
