import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";

export default class VehicleCreate extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = { fetching: false, engines: [] };
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillUnmount() {
		console.log("Unmount Vehicle Create");
	}

	componentDidMount() {
		const o = this;
		console.log("Mount Vehicle Create");
		this.fetchAPI("/api/vehicles/engine_types", "GET", null, (d) => {
			o.setState({ fetching: false, engines: d });
		});
		o.setState({ fetching: true });
	}

	onSubmit(e) {
		const o = this;
		e.preventDefault();
		if (this.state.fetching) return false;
		const form = e.target;
		const nameinp = form.name;
		const modelinp = form.model;
		const engineinp = form.engine;
		const data = { name: nameinp.value, model: modelinp.value, engine: engineinp.value };
		console.log(data);
		this.fetchAPI(form.action, form.method, data, (d) => {
			nameinp.value = "";
			modelinp.value = "";
			o.setState({ fetching: false });
		});
		o.setState({ fetching: true });
		return false;
	}

	render() {
		console.log("Render Vehicle Create");
		const engines = this.state.engines;
		const engineOptions = engines.map((e) => <option value={e}>{e}</option>);
		return (
			<div>
				<form className="vc_form" method="POST" action="/api/vehicles/create" onSubmit={this.onSubmit}>
					<input type="text" name="name" placeholder="Vehicle Name" required={true} minLength={1} />
					<input type="text" name="model" placeholder="Vehicle Model" required={true} minLength={1} />
					<select name="engine">{engineOptions}</select>
					<br />
					<button>Submit</button>
				</form>
				<br />
				<div>Fetching: {this.state.fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
