import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";

export default class VehicleAssembly extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = {
			f1: false,
			f2: false,
			f3: false,
			fetching: false,
			vehicles: [],
			parts: [],
			vendors: [],
			vehicle_parts: [],
		};
		this.onChangeVehicle = this.onChangeVehicle.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillUnmount() {
		console.log("Unmount Vehicle Assembly");
	}

	componentDidMount() {
		const o = this;
		console.log("Mount Vehicle Assembly");
		this.fetchAPI("/api/vehicles/", "GET", null, (d) => {
			o.setState({ vehicles: d });
			o.fetchAPI("/api/vehicles/parts_details/" + d[0].id + "/", "GET", null, (dd) => {
				o.setState({ f1: false, vehicle_parts: dd });
			});
		});
		this.fetchAPI("/api/parts/", "GET", null, (d) => {
			o.setState({ f2: false, parts: d });
		});
		this.fetchAPI("/api/vendors/", "GET", null, (d) => {
			o.setState({ f3: false, vendors: d });
		});
		o.setState({ f1: true, f2: true, f3: true });
	}

	isFetching() {
		return this.state.fetching || this.state.f1 || this.state.f2 || this.state.f3;
	}

	onChangeVehicle(e) {
		const o = this;
		o.fetchAPI("/api/vehicles/parts_details/" + o.vehicle_id.value + "/", "GET", null, (dd) => {
			o.setState({ f1: false, vehicle_parts: dd });
		});
		o.setState({ f1: true });
	}

	onSubmit(e) {
		const o = this;
		e.preventDefault();
		const fetching = this.isFetching();
		if (fetching) return false;
		const form = e.target;
		const vehicleinp = form.vehicle_id;
		const partinp = form.parts_id;
		const vendorinp = form.vendor_id;
		const countinp = form.count;
		const data = {
			vehicle_id: +vehicleinp.value,
			parts_id: +partinp.value,
			vendor_id: +vendorinp.value,
			count: +countinp.value,
		};
		console.log(data);
		this.fetchAPI(form.action, form.method, data, (d) => {
			o.setState({ f1: true, fetching: false });
			o.fetchAPI("/api/vehicles/parts_details/" + o.vehicle_id.value + "/", "GET", null, (dd) => {
				o.setState({ f1: false, vehicle_parts: dd });
			});
		});
		o.setState({ fetching: true });
		return false;
	}

	render() {
		console.log("Render Vehicle Assembly");
		const vehicles = this.state.vehicles;
		const vehOptions = vehicles.map((e) => (
			<option value={e.id}>
				{e.name}, {e.model}, {e.engine}
			</option>
		));
		const parts = this.state.parts;
		const partOptions = parts.map((e) => (
			<option value={e.id}>
				{e.name}, {e.type}, {e.model}
			</option>
		));
		const vendors = this.state.vendors;
		const vendOptions = vendors.map((e) => <option value={e.id}>{e.name}</option>);
		const vehicle_parts = this.state.vehicle_parts;
		const vehparts = vehicle_parts.map((e) => (
			<div ref={e.id}>
				<span>{e.name}</span>, <span>{e.type}</span>, <span>{e.model}</span>, <span>{e.count}</span>
			</div>
		));
		const fetching = this.isFetching();
		return (
			<div>
				<form method="POST" action="/api/vehicles/addpart" onSubmit={this.onSubmit}>
					<select name="vehicle_id" onChange={this.onChangeVehicle} ref={(e) => (this.vehicle_id = e)}>
						{vehOptions}
					</select>
					<select name="parts_id">{partOptions}</select>
					<select name="vendor_id">{vendOptions}</select>
					<input type="number" name="count" placeholder="Part Count" required={true} minLength={1} min={0} />
					<br />
					<button>Submit</button>
				</form>
				<br />
				<div>{vehparts}</div>
				<div>Fetching: {fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
