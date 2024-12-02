import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";

export default class StoreCreate extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = {
			f1: false,
			f2: false,
			fetching: false,
			parts: [],
			vendors: [],
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillUnmount() {
		console.log("Unmount Store Create");
	}

	componentDidMount() {
		const o = this;
		console.log("Mount Store Create");
		this.fetchAPI("/api/parts/", "GET", null, (d) => {
			o.setState({ f1: false, parts: d });
		});
		this.fetchAPI("/api/vendors/", "GET", null, (d) => {
			o.setState({ f2: false, vendors: d });
		});
		o.setState({ f1: true, f2: true });
	}

	isFetching() {
		return this.state.fetching || this.state.f1 || this.state.f2;
	}

	onSubmit(e) {
		const o = this;
		e.preventDefault();
		const fetching = this.isFetching();
		if (fetching) return false;
		const form = e.target;
		const partinp = form.parts_id;
		const vendorinp = form.vendor_id;
		const countinp = form.count;
		const priceinp = form.price;
		const data = {
			parts_id: +partinp.value,
			vendor_id: +vendorinp.value,
			count: +countinp.value,
			price: +priceinp.value,
		};
		console.log(data);
		this.fetchAPI(form.action, form.method, data, (d) => {
			o.setState({ fetching: false });
		});
		o.setState({ fetching: true });
		return false;
	}

	render() {
		console.log("Render Store Create");
		const parts = this.state.parts;
		const partOptions = parts.map((e) => (
			<option value={e.id}>
				{e.name}, {e.type}, {e.model}
			</option>
		));
		const vendors = this.state.vendors;
		const vendOptions = vendors.map((e) => <option value={e.id}>{e.name}</option>);
		const fetching = this.isFetching();
		return (
			<div>
				<form className="sc_form" method="POST" action="/api/store/" onSubmit={this.onSubmit}>
					<select name="parts_id">{partOptions}</select>
					<select name="vendor_id">{vendOptions}</select>
					<input type="number" name="count" placeholder="Part Count" required={true} minLength={1} min={0} />
					<input
						type="number"
						name="price"
						placeholder="Price"
						required={true}
						minLength={1}
						min={0}
						step={100}
					/>
					<br />
					<button>Submit</button>
				</form>
				<br />
				<div>Fetching: {fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
