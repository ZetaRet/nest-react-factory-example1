import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";

export default class VendorsCreate extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = { fetching: false };
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillUnmount() {
		console.log("Unmount Vendors Create");
	}

	onSubmit(e) {
		const o = this;
		e.preventDefault();
		if (this.state.fetching) return false;
		const form = e.target;
		const nameinp = form.name;
		const data = { name: nameinp.value };
		console.log(data);
		this.fetchAPI(form.action, form.method, data, (d) => {
			o.setState({ fetching: false });
		});
		o.setState({ fetching: true });
		return false;
	}

	render() {
		console.log("Render Vendors Create");
		return (
			<div>
				<form method="POST" action="/api/vendors/" onSubmit={this.onSubmit}>
					<input type="text" name="name" placeholder="Vendor Name" required={true} minLength={1} />
					<br />
					<button>Submit</button>
				</form>
				<br />
				<div>Fetching: {this.state.fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
