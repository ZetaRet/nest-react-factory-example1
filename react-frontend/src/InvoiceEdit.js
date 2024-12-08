import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";
import InvoiceViewParts from "./InvoiceViewParts";
import InvoiceViewServices from "./InvoiceViewServices";

export default class InvoiceEdit extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = {
			fetching: false,
			f1: false,
			f2: false,
			f3p: false,
			f4s: false,
			f5v: false,
			data: null,
			parts: null,
			services: null,
			vehicles: null,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.removeInvoicePart = this.removeInvoicePart.bind(this);
		this.removeInvoiceService = this.removeInvoiceService.bind(this);
		this.onAddPart = this.onAddPart.bind(this);
		this.onAddVehicle = this.onAddVehicle.bind(this);
		this.onAddService = this.onAddService.bind(this);
	}

	componentWillUnmount() {
		console.log("Unmount Invoice Edit");
	}

	componentDidMount() {
		const o = this;
		const invoiceid = this.props.invoiceid;
		console.log("Mount Invoice Edit");
		this.fetchAPI("/api/invoices/" + invoiceid + "/", "GET", null, (d) => {
			let state = { fetching: false, data: { invoice: d } };
			if (!d.final) {
				state.f1 = true;
				state.f2 = true;
			}
			o.clientinp.value = d.client;
			o.setState(state);
			if (d.final) return;
			o.fetchAPI("/api/invoices/parts/" + d.id, "GET", null, (dd) => {
				const data = this.state.data;
				data.parts = dd;
				o.setState({ f1: false, data: data });
			});
			o.fetchAPI("/api/invoices/array/" + d.id, "GET", null, (dd) => {
				const data = this.state.data;
				data.services = dd;
				o.setState({ f2: false, data: data });
			});
		});
		this.fetchAPI("/api/store/details", "GET", null, (d) => {
			d.ids = {};
			d.forEach((e) => (d.ids[e.id] = e));
			o.setState({ f3p: false, parts: d });
		});
		this.fetchAPI("/api/invoices/services/all", "GET", null, (d) => {
			d.ids = {};
			d.forEach((e) => (d.ids[e.id] = e));
			o.setState({ f4s: false, services: d });
		});
		this.fetchAPI("/api/vehicles/", "GET", null, (d) => {
			o.setState({ f5v: false, vehicles: d });
		});
		o.setState({ fetching: true, f3p: true, f4s: true, f5v: true });
	}

	isFetching() {
		let s = this.state;
		return s.fetching && s.f1 && s.f2 && s.f3p && s.f4s && s.f5v;
	}

	onSubmit(e) {
		const o = this;
		e.preventDefault();
		if (this.isFetching()) return false;
		const form = e.target;
		const data = { final: true };
		console.log(data);
		this.fetchAPI(form.action, form.method, data, (d) => {
			o.setState({ fetching: false });
			const { navigate, invoiceid } = o.props;
			navigate("/invoices/view/" + invoiceid);
		});
		o.setState({ fetching: true });
		return false;
	}

	formInput() {
		return (
			<input
				type="text"
				name="client"
				placeholder="Invoice Client"
				required={true}
				minLength={1}
				disabled
				ref={(e) => (this.clientinp = e)}
			/>
		);
	}

	viewInvoiceParts(data) {
		let invparts = data && data.parts ? data.parts : [];
		const parts = this.state.parts;
		if (parts) {
			invparts.forEach((d) => {
				let det = parts.ids[d.store_id];
				d.name = det ? det.name : "not in store";
				d.type = det ? det.type : "-";
				d.model = det ? det.model : "-";
				d.vendor_name = det ? det.vendor_name : "-";
			});
		}
		return <InvoiceViewParts data={invparts} removeHandler={this.removeInvoicePart} />;
	}

	viewInvoiceServices(data) {
		let invserv = data && data.services ? data.services : [];
		const services = this.state.services;
		if (services) {
			invserv.forEach((d) => {
				let det = services.ids[d.service_id];
				d.name = det.name;
			});
		}
		return <InvoiceViewServices data={invserv} removeHandler={this.removeInvoiceService} />;
	}

	removeInvoicePart(d) {
		if (this.isFetching()) return;
		const o = this;
		const data = o.state.data;
		let index = data.parts.indexOf(d);
		data.parts.splice(index, 1);
		o.setState({ fetching: true, data: data });
		o.fetchAPI("/api/invoices/remove_parts/" + d.id, "GET", null, (dd) => {
			o.setState({ fetching: false });
		});
	}

	removeInvoiceService(d) {
		if (this.isFetching()) return;
		const o = this;
		const data = o.state.data;
		let index = data.services.indexOf(d);
		data.services.splice(index, 1);
		o.setState({ fetching: true, data: data });
		o.fetchAPI("/api/invoices/remove_array/" + d.id, "GET", null, (dd) => {
			o.setState({ fetching: false });
		});
	}

	onAddPart(e) {
		const o = this;
		e.preventDefault();
		if (this.isFetching()) return false;
		const form = e.target;
		const data = { store_id: +form.store_id.value, count: +form.count.value };
		const find = this.state.parts.find((p) => p.id == data.store_id);
		console.log(data, find);
		this.fetchAPI(form.action, form.method, data, (d) => {
			const sdata = o.state.data;
			sdata.parts.push({
				id: d.id,
				store_id: find.id,
				parts_id: find.parts_id,
				name: find.name,
				type: find.type,
				model: find.model,
				count: data.count,
				price: find.price,
				vendor_id: find.vendor_id,
				vendor_name: find.vendor_name,
			});
			o.setState({ fetching: false, data: sdata });
		});
		o.setState({ fetching: true });
		return false;
	}

	onAddVehicle(e) {
		const o = this;
		e.preventDefault();
		if (this.isFetching()) return false;
		const form = e.target;
		const data = { vehicle_id: +form.vehicle_id.value };
		console.log(data);
		this.fetchAPI(form.action, form.method, data, (d) => {
			o.setState({ fetching: false, f1: true });
			o.fetchAPI("/api/invoices/parts/" + o.props.invoiceid, "GET", null, (dd) => {
				const data = this.state.data;
				data.parts = dd;
				o.setState({ f1: false, data: data });
			});
		});
		o.setState({ fetching: true });
		return false;
	}

	onAddService(e) {
		const o = this;
		e.preventDefault();
		if (this.isFetching()) return false;
		const form = e.target;
		const data = { service_id: +form.service_id.value, count: +form.count.value };
		const find = this.state.services.find((p) => p.id == data.service_id);
		console.log(data, find);
		this.fetchAPI(form.action, form.method, data, (d) => {
			const sdata = o.state.data;
			sdata.services.push({
				id: d.id,
				service_id: find.id,
				name: find.name,
				count: data.count,
				price: find.price,
			});
			o.setState({ fetching: false, data: sdata });
		});
		o.setState({ fetching: true });
		return false;
	}

	addInvoicePart() {
		const data = this.state.data;
		const parts = this.state.parts || [];
		const partOptions = parts.map((p) => (
			<option value={p.id}>
				{p.name + ", " + p.type + ", " + p.model + ": " + p.price + " [" + p.vendor_name + "]"}
			</option>
		));
		return (
			<form
				className="aip_form"
				method="POST"
				action={"/api/invoices/add_parts/" + (data ? data.invoice.id : "")}
				onSubmit={this.onAddPart}
			>
				<select name="store_id">{partOptions}</select>
				<input type="number" name="count" placeholder="Count" required={true} minLength={1} min={0} />
				<button>Add Part</button>
			</form>
		);
	}

	addInvoiceVehicle() {
		const data = this.state.data;
		const vehicles = this.state.vehicles || [];
		const vehOptions = vehicles.map((p) => (
			<option value={p.id}>{p.name + ", " + p.model + ", " + p.engine}</option>
		));
		return (
			<form
				className="aiv_form"
				method="POST"
				action={"/api/invoices/add_vehicle/" + (data ? data.invoice.id : "")}
				onSubmit={this.onAddVehicle}
			>
				<select name="vehicle_id">{vehOptions}</select>
				<button>Add Vehicle</button>
			</form>
		);
	}

	addInvoiceService() {
		const data = this.state.data;
		const services = this.state.services || [];
		const servOptions = services.map((p) => <option value={p.id}>{p.name + ": " + p.price}</option>);
		return (
			<form
				className="ais_form"
				method="POST"
				action={"/api/invoices/add_array/" + (data ? data.invoice.id : "")}
				onSubmit={this.onAddService}
			>
				<select name="service_id">{servOptions}</select>
				<input type="number" name="count" placeholder="Count" required={true} minLength={1} min={0} />
				<button>Add Service</button>
			</form>
		);
	}

	invoiceComponents() {
		const data = this.state.data;
		return (
			<>
				<div>{this.viewInvoiceParts(data)}</div>
				<br />
				<div>{this.addInvoicePart()}</div>
				<br />
				<div>{this.addInvoiceVehicle()}</div>
				<br />
				<div>{this.viewInvoiceServices(data)}</div>
				<br />
				<div>{this.addInvoiceService()}</div>
			</>
		);
	}

	render() {
		console.log("Render Invoice Edit");
		const data = this.state.data;
		const fetching = this.isFetching();
		return (
			<div>
				<form
					method="POST"
					action={"/api/invoices/update/" + (data ? data.invoice.id : "")}
					onSubmit={this.onSubmit}
				>
					{this.formInput()}
					<br />
					<button>Final</button>
				</form>
				<br />
				{data && data.invoice && data.invoice.final ? <div>Final Invoice</div> : this.invoiceComponents()}
				<br />
				<div>Fetching: {fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
