import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";

export default class StoreEdit extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = { fetching: false, data: null };
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillUnmount() {
		console.log("Unmount Store Edit");
	}

	componentDidMount() {
		const o = this;
		const storeid = this.props.storeid;
		console.log("Mount Store Edit");
		this.fetchAPI("/api/store/" + storeid + "/", "GET", null, (d) => {
			o.countinp.value = d.count;
			o.priceinp.value = d.price;
			o.setState({ fetching: false, data: d });
		});
		o.setState({ fetching: true });
	}

	onSubmit(e) {
		const o = this;
		e.preventDefault();
		if (this.state.fetching) return false;
		const form = e.target;
		const countinp = form.count;
		const priceinp = form.price;
		const data = {
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
		console.log("Render Store Edit");
		const data = this.state.data;
		const partOptions = data ? <option value={data.parts_id}>Part Id: {data.parts_id}</option> : <option />;
		const vendOptions = data ? <option value={data.vendor_id}>Vendor Id: {data.vendor_id}</option> : <option />;
		const fetching = this.state.fetching;
		return (
			<div>
				<form
					className="se_form"
					method="POST"
					action={"/api/store/update/" + (data ? data.id : "")}
					onSubmit={this.onSubmit}
				>
					<select name="parts_id">{partOptions}</select>
					<select name="vendor_id">{vendOptions}</select>
					<input
						type="number"
						name="count"
						placeholder="Part Count"
						required={true}
						minLength={1}
						min={0}
						ref={(e) => (this.countinp = e)}
					/>
					<input
						type="number"
						name="price"
						placeholder="Price"
						required={true}
						minLength={1}
						min={0}
						step={100}
						ref={(e) => (this.priceinp = e)}
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
