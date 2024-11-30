import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";

export default class VehicleList extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = { fetching: false, data: [] };
	}

	componentWillUnmount() {
		console.log("Unmount Vehicle List");
	}

	componentDidMount() {
		const o = this;
		console.log("Mount Vehicle List");
		this.fetchAPI("/api/vehicles/", "GET", null, (d) => {
			o.setState({ fetching: false, data: d });
		});
		o.setState({ fetching: true });
	}

	render() {
		console.log("Render Vehicle List");
		const listdata = this.state.data;
		const listItems = listdata.map((d) => (
			<div ref={d.id}>
				<span>{d.id}</span>, <span>{d.name}</span>, <span>{d.model}</span>, <span>{d.engine}</span>
			</div>
		));
		return (
			<div>
				<div>{listItems}</div>
				<br />
				<div>Fetching: {this.state.fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
