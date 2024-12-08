import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";

export default class InvoiceCreate extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = { fetching: false };
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillUnmount() {
		console.log("Unmount Invoice Create");
	}

	componentDidMount() {
		const o = this;
		console.log("Mount Invoice Create");
	}

	onSubmit(e) {
		const o = this;
		e.preventDefault();
		const fetching = this.state.fetching;
		if (fetching) return false;
		const form = e.target;
		const clientinp = form.client;
		const data = { client: clientinp.value };
		console.log(data);
		this.fetchAPI(form.action, form.method, data, (d) => {
			clientinp.value = "";
			o.setState({ fetching: false });
		});
		o.setState({ fetching: true });
		return false;
	}

	render() {
		console.log("Render Invoice Create");
		const fetching = this.state.fetching;
		return (
			<div>
				<form method="POST" action="/api/invoices/" onSubmit={this.onSubmit}>
					<input type="text" name="client" placeholder="Invoice Client" required={true} minLength={1} />
					<button>Submit</button>
				</form>
				<br />
				<div>Fetching: {fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
