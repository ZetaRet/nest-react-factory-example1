import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";

export default class MobilePartsCreate extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = { fetching: false };
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillUnmount() {
		console.log("Unmount Parts Create");
	}

	onSubmit(e) {
		const o = this;
		e.preventDefault();
		if (this.state.fetching) return false;
		const form = e.target;
		const nameinp = form.name;
		const typeinp = form.type;
		const modelinp = form.model;
		const data = { name: nameinp.value, type: typeinp.value, model: modelinp.value };
		console.log(data);
		this.fetchAPI(form.action, form.method, data, (d) => {
			o.setState({ fetching: false });
		});
		o.setState({ fetching: true });
		return false;
	}

	render() {
		console.log("Render Parts Create");
		return (
			<div>
				<form method="POST" action="/api/parts/" onSubmit={this.onSubmit}>
					<input type="text" name="name" placeholder="Part Name" minlength="1" />
					<input type="text" name="type" placeholder="Part Type" minlength="1" />
					<input type="text" name="model" placeholder="Part Model" minlength="1" />
					<button>Submit</button>
				</form>
				<br />
				<div>Fetching: {this.state.fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
