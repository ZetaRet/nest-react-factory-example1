import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";
import InvoiceViewDataTable from "./InvoiceViewDataTable";
import InvoiceViewParts from "./InvoiceViewParts";
import InvoiceViewServices from "./InvoiceViewServices";

export default class InvoiceView extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = { fetching: false, data: null };
	}

	componentWillUnmount() {
		console.log("Unmount Invoice View");
	}

	componentDidMount() {
		console.log("Mount Invoice View");
		this.updateData();
	}

	componentDidUpdate(prevProps) {
		console.log("Update Invoice View");
		if (this.props.invoiceid !== prevProps.invoiceid) {
			this.updateData();
		}
	}

	updateData() {
		const o = this;
		const invoiceid = this.props.invoiceid;
		console.log("Update Invoice Data:", invoiceid);
		this.fetchAPI("/api/invoices/view/" + invoiceid + "/", "GET", null, (d) => {
			o.setState({ fetching: false, data: d });
		});
		o.setState({ fetching: true });
	}

	formatDate(value) {
		let date = new Date(value);
		return date.toDateString() + " " + date.toLocaleTimeString();
	}

	viewInvoiceData(data) {
		let invdata = data ? data.invoice : null;
		if (invdata) {
			invdata.format_created_at = this.formatDate(invdata.created_at);
			invdata.format_updated_at = this.formatDate(invdata.updated_at);
		}
		return <InvoiceViewDataTable data={invdata} />;
	}

	viewInvoiceParts(data) {
		let invparts = data ? data.parts : [];
		return <InvoiceViewParts data={invparts} />;
	}

	viewInvoiceServices(data) {
		let invserv = data ? data.services : [];
		return <InvoiceViewServices data={invserv} />;
	}

	render() {
		console.log("Render Invoice View");
		const data = this.state.data;
		const fetching = this.state.fetching;
		return (
			<div>
				{data && data.err ? "No Invoice Id" : this.viewInvoiceData(data)}
				<br />
				<div>{this.viewInvoiceParts(data)}</div>
				<br />
				<div>{this.viewInvoiceServices(data)}</div>
				<br />
				<div>Fetching: {fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
